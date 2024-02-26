import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

export const Account = mongoose.model('Account', accountSchema);
