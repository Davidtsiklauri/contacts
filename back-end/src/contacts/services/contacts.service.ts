import { Injectable, Post, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { IContact, iContactsSearch } from '../model/contacts.interface';


@Injectable()
export class ContactsService {
    constructor(@InjectModel('contacts') private readonly contactsModel: Model<any>) {};

    async addContact(req: any){
         const contact = new this.contactsModel(req);
         try{

             const data = await contact.save(contact);
             const input: IContact = {
                contact_id: data.contact_id,
                first_name: data.first_name,
                last_name: data.last_name,
                phone_number: `${data.phone_number}`,
                user_id: data.user_id 
             };
          return input;
         }catch(e){
              return e;
         }
    };

    async getAllUserContacts(user_id: string): Promise<any> {
        const contacts = await this.contactsModel.aggregate( 
             [
                {
                  '$match': {
                    'user_id':  Types.ObjectId(user_id)
                  }
                }
              ]
        );
        return {
          contacts,
          amount: contacts.length
        }
    };

    async deleteContactById( contact_id: string ){
        try{
           await this.contactsModel.findOneAndRemove({ contact_id })
           return {
             success: true
           }
        }catch{
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
    };

    async editContact( contact_id: string, body: any ) {
        return await this.contactsModel.findOneAndUpdate({ contact_id },{
                phone_number: `${body.phone_number}`,
                first_name:   body.first_name,
                last_name:    body.last_name  
        });
    };
    async searchContacts({ first_name, last_name, phone_number }): Promise<any> {
       const contacts = await this.contactsModel
                                  .find({ first_name: { $regex: first_name, $options: "i" }, 
                                          last_name: { $regex: last_name, $options: "i" },
                                          phone_number: { $regex: phone_number ? `${phone_number}` : '', $options: "i" }});
       return contacts;
       
    }

};
