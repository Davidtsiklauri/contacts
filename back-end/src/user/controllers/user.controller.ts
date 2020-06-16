import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../services/user/user.service';
import { IUser } from '../interfaces/user.interface';


@Controller('user')
export class UserController {

    constructor( 
        private  userService: UserService
    ) {}

    @Post('register')
    async createUser(@Body() body: IUser) {
        return await this.userService.createUser(body);
    };

}
