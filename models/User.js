const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: { 
            type: String,
            required: true,
            unique: true,
            trimmed: true
        },
        email: {
            type: String,
            required: true,
            unique: true },
        thoughs: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thoughts'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        ]
    }
)


const User = model('user', userSchema);

module.exports = User;so 