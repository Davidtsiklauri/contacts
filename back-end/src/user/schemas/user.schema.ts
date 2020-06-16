import * as mongoose from 'mongoose';


export const UserSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        auto: true
    },
    password: {
        required: true,
        type: String
    },
    email: {
        type: String,
        required: true
    }
});
