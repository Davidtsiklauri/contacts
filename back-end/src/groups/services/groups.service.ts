import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Types } from 'mongoose';


@Injectable()
export class GroupsService {
    constructor(
        @InjectModel('groups')   private readonly groupsModel: Model<any>,
        @InjectModel('contacts') private readonly contactsModel: Model<any>
    ){}

    async createGroup(group: any) {
        const Groups = new this.groupsModel(group);
        return await Groups.save();
    };

    async getAllGroups(user_id: string){
        const groups = await this.groupsModel.aggregate( 
            [
                {
                  '$match': {
                    'user_id': Types.ObjectId(user_id)
                  }
                }
            ]
        );
        const parsedContactsInGroup =  groups.map(
              async (group) => {
                return  {
                    contacts: await Promise.all(this.getContactsById(group.contact_ids)),
                    group_id: group.group_id,
                    group_title: group.group_title,
                    user_id: group.user_id
                }
            }
        )
        return await Promise.all(parsedContactsInGroup);
    };
    
   getContactsById = (contact_ids) => contact_ids.map(
        async (contact_id) => {
            return await  this.contactsModel.findOne({ contact_id });
        }
    )

}
