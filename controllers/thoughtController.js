const { User,Thought } = require('../models');

module.exports = {
    async getThoughts (req, res) {
        try{
            const thoughts = await Thought.find()
            .populate('reactions');
            res.json(thoughts);
        }catch (err) {
            res.status(500).json(err);
            console.error(err);
        }
    },

    async getSingleThought (req, res) {
        try{
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .populate('reactions');
            if(!thought){
                return res.status(404).json({ error: `no thought with id: ${req.params.thoughtId}` });
            }
            res.json(thought);
        }catch (err) {
            res.status(500).json(err);
            console.error(err);
        }
    },

    async createThought (req, res) {
        try{
            const thought = await Thought.create(req.body);

            const user = await User.findOne({ _id: req.body.userId });

            if(!user) {
                return res.status(404).jsosn({ error: `no user with id: ${req.body.userId}` })
            };

            user.thoughts.push(thought);

            await user.save();

            res.json(thought);
        }catch (err) {
            res.status(500).json(err);
            console.error(err);
        }
    },

    async updateThought (req, res) {
        try{
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            )

            if(!thought) {
                return res.status(404).json({ error: `no thought with id: ${req.params.thoughtId}` })
            }
            res.json(thought)
        }catch (err) {
            res.status(500).json(err);
            console.error(err);
        }
    },

    async deleteThought (req, res) {
        try{
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if(!thought){
                return res.status(404).json({ error: `no thought with id: ${req.params.thoughtId}` })
            }

            res.json({ message:`thought with id: ${req.params.thoughtId} deleted` })
        }catch (err) {
            res.status(500).json(err);
            console.error(err);
        }
    }
}