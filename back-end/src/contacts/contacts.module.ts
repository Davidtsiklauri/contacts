import { Module } from '@nestjs/common';
import { ContactsService } from './services/contacts.service';
import { ContactsController } from './controllers/contacts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { contactsSchema } from './schemas/user.schema';
import { AuthModule } from 'src/auth/auth.module';
 

@Module({
  providers: [
    ContactsService
  ],
  controllers: [
    ContactsController
  ],
  imports: [
    MongooseModule.forFeature([{name: "contacts", schema: contactsSchema}]),
    AuthModule
  ]
})
export class ContactsModule {}
