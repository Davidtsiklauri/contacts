import { Controller, Post, Body, Get, Delete, Put, Param, UseGuards, Req } from '@nestjs/common';
import { ContactsService } from '../services/contacts.service';
import { JwtAuthGuard } from 'src/auth/auth/jwt-auth.guard';

@Controller('contacts')
export class ContactsController {
    constructor( private contactsService: ContactsService ) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    addContacts(@Body() body: any) {
        return this.contactsService.addContact(body);
    };

    @UseGuards(JwtAuthGuard)
    @Get('all')
    getAllUserContacts( @Req() {user} )  {
        return this.contactsService.getAllUserContacts(user.userId);
    };

    @UseGuards(JwtAuthGuard)
    @Delete(':contact_id')
    deleteContactById(@Param()  { contact_id } ) {
        return this.contactsService.deleteContactById(contact_id)
    };

    @UseGuards(JwtAuthGuard)
    @Put(':contact_id')
    editContact(@Param() { contact_id }, @Body() data: any ){
        return this.contactsService.editContact(contact_id, data)
    };

}
