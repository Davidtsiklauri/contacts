import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth/auth.controller';
import { jwtConstants } from './jwtConstants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10h' }
  })
  ],
  providers: [  
    AuthService,
    JwtStrategy
  ],
  controllers: [AuthController]
})
export class AuthModule {}

