import { Injectable, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/services/user/user.service';
import { IUser } from 'src/user/interfaces/user.interface';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

   
  async login (body) {

     const { email, password } = body;
     
     const data: IUser = await this.usersService
      .getByEmail(email);

     const isValid =  await this.usersService.doesUserExists( data.password, password);

     if(isValid) {
       const payload = { email: data.email, sub: data.user_id };
       return {
          access_token: this.jwtService.sign(payload)
       };

     }else {
          throw new HttpException('Wrong Creditinials', HttpStatus.UNAUTHORIZED);
     };
     
  
  };
  
}