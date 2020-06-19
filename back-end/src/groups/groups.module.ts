import { Module } from '@nestjs/common';
import { GroupsService } from './services/groups.service';
import { GroupsController } from './controllers/groups.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { groupsSchema } from './schemas/groups.schema';
import { AuthModule } from 'src/auth/auth.module';
import { ContactsModule } from 'src/contacts/contacts.module';

@Module({
  providers: [GroupsService],
  controllers: [GroupsController],
  imports: [
    MongooseModule.forFeature([{name: "groups", schema: groupsSchema}]),
    AuthModule,
    ContactsModule
  ],
})
export class GroupsModule {}
