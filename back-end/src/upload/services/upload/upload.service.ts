import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UploadService {
    constructor(@InjectModel('contacts') private readonly contactsModel: Model<any>) { };

    async uploadFileInContacts(contact_id: string, filePath: string) {
       try{
            const file = `/api/upload/${filePath}`;
            await  this.contactsModel
                       .findOneAndUpdate({ contact_id }, { file: file });
            return {file: file};
       }catch{
            throw new HttpException('contact by this id not found', HttpStatus.NOT_FOUND); 
       }
    };
}
