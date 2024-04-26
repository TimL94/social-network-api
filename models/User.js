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
        thoughts: [
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
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
})


const User = model('user', userSchema);

module.exports = User; 