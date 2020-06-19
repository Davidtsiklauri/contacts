import { Module } from '@nestjs/common';
import { UploadController } from './controllers/upload/upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ContactsModule } from 'src/contacts/contacts.module';
import { AuthModule } from 'src/auth/auth.module';
import { UploadService } from './services/upload/upload.service';


@Module({
  controllers: [UploadController],
  imports: [
    ContactsModule,
    MulterModule.register({
      dest: './file'
    }),
    AuthModule,
    ContactsModule
  ],
  providers: [
    UploadService
  ]
})
export class UploadModule {}
