import * as mongoose from 'mongoose';


export const contactsSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    contact_id: {
        type: mongoose.Types.ObjectId,
        auto: true
    },
    file: {
        type: String,
    },
    phone_number: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
});
