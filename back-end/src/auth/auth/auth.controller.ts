import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { IUser } from 'src/user/interfaces/user.interface';

@Controller('auth')
export class AuthController {
    constructor( private authService: AuthService){ }
    
    @Post()
    auth( @Body() body: IUser ) {
        return this.authService.login(body);
    }
}
