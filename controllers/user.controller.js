const User = require('../dataBase/User');
const normalizer = require("../util/user.util");
const {
  errorMessage:{ ok }
} = require('../errors');

module.exports = {
  createUser: async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      const userPrepare = normalizer.userNormalizer(newUser);
      
      res.json(userPrepare);
    } catch (err) {
      res.json(err);
    }
  },
  
  getUser: async (req, res) => {
    try {
      const users = await User.find().lean();
      const usersPrepare = [];
  
      if (users.length) {
        users.forEach((user) => {
          usersPrepare.push(normalizer.userNormalizer(user));
        });
      }
  
      res.json(usersPrepare);
    } catch (err) {
      res.json(err);
    }
  },
  getUserById: (req, res) => {
    try {
      const user = normalizer.userNormalizer(req.user);
      
      res.json(user);
    } catch (err) {
      res.json(err);
    }
  },
  
  updateUser: async (req, res) => {
    try {
      const { _id } = req.user;
      const { firstName, lastName, userType } = req.body;
      
      await User.findByIdAndUpdate(_id,{ firstName, lastName, userType });
      
      res.sendStatus(ok.status);
    } catch (err) {
      res.json(err);
    }
  },
  
  deleteUser: async (req,res) => {
    try {
      const { _id } = req.user;
      await User.deleteOne({ _id });
      
      res.sendStatus(ok.status);
    } catch (err) {
      res.json(err);
    }
  }
};
