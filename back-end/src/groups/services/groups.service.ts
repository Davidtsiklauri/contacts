import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Types } from 'mongoose';


@Injectable()
export class GroupsService {
    constructor(@InjectModel('groups') private readonly groupsModel: Model<any>){}
    async createGroup(group: any) {
        const Groups = new this.groupsModel(group);
        return await Groups.save();
    };

    async getAllGroups(user_id: string){
        return this.groupsModel.aggregate( 
            [
                {
                  '$match': {
                    'user_id': Types.ObjectId(user_id)
                  }
                }
              ]
        );
    }
}
