const { Schema, model } = require('mongoose');

// schema for creating a user, regex is used to verify the email is in correct format
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
            unique: true,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Invalid email format'
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user'
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

// virtual for displaying number of friends each user has
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
})


const User = model('user', userSchema);

module.exports = User; 