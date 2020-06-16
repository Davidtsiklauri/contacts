import { Controller, Post, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ContactsService } from 'src/contacts/services/contacts.service';

@Controller('upload')
export class UploadController {
    constructor(private contactsService: ContactsService){
        
    }
    @Post() 
    @UseInterceptors(AnyFilesInterceptor())
    uploadFile(@UploadedFiles() files) {
         console.log(files);
    }

}
