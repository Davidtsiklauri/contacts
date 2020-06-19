import { Model } from 'mongoose';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from 'src/user/interfaces/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<any>) {}

    async  createUser(user: IUser) {
        const  { email, password} = user;
        const hash = await bcrypt.hash(password, 10);
        const userModel = new this.userModel({password: hash, email});
        try{
            return await userModel.save();
        }catch(err){
            // Unique Email
            if(err && err.code && err.code === 11000) {
               throw new HttpException('email with this email exists', HttpStatus.UNAUTHORIZED);
            }
            return err;
        }
    };

    async getByEmail(email: string): Promise<any> {
        const user = await this.userModel.findOne({ email });
        if (user) {
          return user;
        }
        throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
    };

    async doesUserExists(hashed: string, password: string): Promise<boolean> {
            return await bcrypt.compare(  password, hashed );
    };

    async findIfEmailExists( email: string ): Promise<any> {
           const users = await this.userModel.find({ email });
           return users;
    };

    async updateUserPassword(user_id: string, password: string): Promise<any> {
        const hash = await bcrypt.hash(password, 10);
        return await this.userModel
                         .updateOne({user_id}, { password: hash })
    };

    async getUserByUserId( user_id: string ): Promise<any> {
        try{
            const users = await this.userModel.find({ user_id });
            return users;
        }catch{
            throw new HttpException('not foud', HttpStatus.NOT_FOUND)
        }
    };

}
