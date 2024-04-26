const { ObjectId } = require('bson');
const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: ObjectId,
            default: new ObjectId
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 200
        },
        username: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
);

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        username: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);


thoughtSchema
.virtual('reactionCount')
.get(function () {
    return this.thoughts.length;
})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;