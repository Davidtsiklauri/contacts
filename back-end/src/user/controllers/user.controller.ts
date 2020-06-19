import { Controller, Post, Body, HttpException, HttpStatus, Get, Param, Res } from '@nestjs/common';
import { UserService } from '../services/user/user.service';
import { IUser } from '../interfaces/user.interface';
import { MailerService } from '@nestjs-modules/mailer';


@Controller('user')
export class UserController {

    constructor( 
        private  userService: UserService,
        private readonly mailerService: MailerService
    ) {}

    @Post('register')
    async createUser(@Body() body: IUser) {
        return await this.userService.createUser(body);
    };

    @Post('recover_password')
    async recoverPassword(@Body() {email, password}) {
        const user = await this.userService.findIfEmailExists(email);
        if( user.length > 0 ) {
            console.log(user);
            
        const input = {
            to: email,
            subject: 'remember password',  
            html: `<a href="http://localhost:4200/api/user/${user[0].user_id}/${password}">Remember Password</a>`, 
         };
          try{
              return this.mailerService.sendMail(input)
          }catch(e){
              return e;
           }
      
        } else {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
    };

    @Get(':user_id/:password')
    async changePassword(@Param() { user_id, password }, @Res() res: any) {
        await this.userService.updateUserPassword(user_id, password);
        const user = await this.userService.getUserByUserId(user_id);
        const redirectUrl = new URL(`${process.env.FRONT_END_PATH}/auth/update_password/${user[0].email}/${password}`);
        return res.redirect(redirectUrl.toString());
    }

   
}
