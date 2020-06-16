import { Module } from '@nestjs/common';
import { UploadController } from './controllers/upload/upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ContactsModule } from 'src/contacts/contacts.module';


@Module({
  controllers: [UploadController],
  imports: [
    ContactsModule,
    MulterModule.register({
      dest: '/file'
    })
  ]
})
export class UploadModule {}
