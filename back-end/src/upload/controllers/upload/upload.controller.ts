import { Controller, Post, UseInterceptors, UploadedFiles, UseGuards, Req } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ContactsService } from 'src/contacts/services/contacts.service';
import { JwtAuthGuard } from 'src/auth/auth/jwt-auth.guard';

@Controller('upload')
export class UploadController {

    constructor(private contactsService: ContactsService){ }

    @UseGuards(JwtAuthGuard)
    @Post('contacts') 
    @UseInterceptors(AnyFilesInterceptor())
    uploadFile(@UploadedFiles() files , @Req() { user } ) {
         console.log(files, user);
    }

}
