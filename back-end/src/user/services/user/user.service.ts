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
        return await userModel.save();
    };

    async login( creditinials: any ) {
        console.log(creditinials);
    };

    async getByEmail(email: string) {
        const user = await this.userModel.findOne({ email });
        if (user) {
          return user;
        }
        throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
    };

    async doesUserExists(hashed: string, password: string): Promise<boolean> {
            return await bcrypt.compare(  password, hashed);
    };

}
