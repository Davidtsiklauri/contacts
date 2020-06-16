import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './controllers/user.controller';
import { UserSchema } from './schemas/user.schema';
import { UserService } from './services/user/user.service';
 

@Module({
    controllers: [
        UserController
    ],
    imports: [
        MongooseModule.forFeature([{name: "User", schema: UserSchema}]),
    ],
    providers: [
        UserService
    ],
    exports :[
        UserService
    ]
}) 
export class UserModule {}
