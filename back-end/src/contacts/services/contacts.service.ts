import { Injectable, Post } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';


@Injectable()
export class ContactsService {
    constructor(@InjectModel('contacts') private readonly contactsModel: Model<any>) {};

    async addContact(req: any){
         const contact = new this.contactsModel(req);
         try{
             return await contact.save(contact);
         }catch(e){
              return e;
         }
    };

    async getAllUserContacts(user_id: string): Promise<any> {
        return await this.contactsModel.aggregate( 
             [
                {
                  '$match': {
                    'user_id':  Types.ObjectId(user_id)
                  }
                }
              ]
        );
    };

    async deleteContactById( contact_id: string ){
        return await this.contactsModel.findOneAndRemove({ contact_id })
    };

    async editContact( contact_id: string, body: any ) {
        return await this.contactsModel.findOneAndUpdate({ contact_id },{
                phone_number: body.phone_number,
                first_name:   body.first_name,
                last_name:    body.last_name  
        });
    };

};
