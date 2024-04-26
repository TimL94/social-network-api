const { User,Thought } = require('../models');

module.exports = {
    async getUsers(req, res) {
        try{
            const users = await User.find()
            .populate('thoughts');
            res.json(users);
        }catch (error){
            res.status(500).json(error);
            console.error(error)
        }
    },

    async getSingleUser(req, res) {
        try{
            const user = await User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate('thoughts');
            if(!user) {
                return res.status(404).json({ error: `no user matching id: ${req.params.userId}` })
            }
            res.json(user);
        }catch (err){
            res.status(500).json(err);
        }
    },
    
    async createUser(req, res) {
        try{
            const user = await User.create(req.body);
            res.json(user);
        }catch (err) {
            res.status(500).json(err)
        }
    },

    async updateUser (req, res) {
        try{
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if(!user) {
                return res.status(404).json({ error: `no user with id: ${req.params.userId}` })
            }

            res.json(user);
        }catch (err) {
            res.status(500).json(err)
        }
    },

    async deleteUser (req, res) {
        try{
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if(!user) {
                res.status(404).json({ error: `no user with id:  ${req.params.userId}` })
            }

            /* verifies that the user has thoughts and if true deletes them
            if (user.thoughts.length > 0) {
                await Thought.deleteMany({ $in: user.thoughts });
            }
            */
            res.json({ message: 'User and thoughts deleted' })
        }catch(err) {
            res.status(500).json(err);
            console.error(err)
        }
    }
}