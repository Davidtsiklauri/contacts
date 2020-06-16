import * as mongoose from 'mongoose';


export const groupsSchema = new mongoose.Schema({
     user_id: {
         type: mongoose.Types.ObjectId,
         required: true
     },
     group_title: {
        type: String,
        required: true
     },
     group_id: {
        type: mongoose.Types.ObjectId,
        auto: true
     },
     contact_ids: [
         mongoose.Types.ObjectId
     ]
});
