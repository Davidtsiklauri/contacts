import { Controller, Post, UseInterceptors, 
         UploadedFiles, UseGuards,  Param, Get, Header, Res 
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/auth/jwt-auth.guard';
import { UploadService } from 'src/upload/services/upload/upload.service';


@Controller('upload')
export class UploadController {

    constructor(
        private uploadService: UploadService
    ){ }

    @UseGuards(JwtAuthGuard)
    @Post('contacts/:contact_id') 
    @UseInterceptors(AnyFilesInterceptor())
    uploadFile(@UploadedFiles() file , @Param() params ) {
         return this.uploadService
                    .uploadFileInContacts(params.contact_id, file[0].filename);
    };

    @Get(':id')
    @Header('content-type', 'image/jpeg')
    async getPhoto(@Param() params, @Res() res) {
          res.sendFile(params.id, { root: 'file'});
    };
 
}
