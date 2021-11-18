const { Types } = require("mongoose");

const User = require('../dataBase/User');
const validator = require('../validators/user.validator');
const {
  errorMessage: {
    badRequest,
    alreadyExistEmail,
    alreadyExistUserName,
    idNotExist,
    differentPassword
  }
} = require('../errors');
const passwordService = require('../service/password.service')

module.exports = {
  isUserFieldsValid: (req, res, next) => {
    try {
      const { error, value } = validator.userValidator.validate(req.body);
      
      if(error) {
        next({
          message: error.details[0].message,
          status: badRequest.status
        })
      }
      
      req.body = value;
      next();
    } catch (err) {
      next(err.message);
    }
  },
  
  checkUserName: async (req, res, next) => {
    try {
      const { userName } = req.body;
      const findUserName =  await User.findOne({ userName });
      
      if(findUserName) {
        next(alreadyExistUserName);
        return;
      }
      
      next();
    } catch (err) {
      next(err);
    }
  },
  
  checkEmail: async (req, res, next) => {
    try {
      const { email } = req.body;
      const findMail = await User.findOne({ email });
      
      if(findMail) {
        next(alreadyExistEmail);
        return;
      }
     
      next()
    } catch (err) {
      next(err);
    }
  },
  checkRepeatPassword: (req, res, next) => {
    try{
      const { password, repeatPassword } = req.body;
      const result = password.localeCompare(repeatPassword);
      
      if(result) {
        next(differentPassword);
      }
      next();
    } catch (err) {
      next(err);
    }
  },
  hashPassword: async (req, res, next) => {
    try{
      const { password } = req.body;
      
      const passwordWasHashed = await passwordService.hash(password);
      
      req.body = {
        ...req.body,
        password: passwordWasHashed
      }
      next();
    } catch (err) {
      next(err);
    }
  },
  checkEditPassword: async (req, res, next) => {
    try{
      const { password: editPassword } = req.body
      const { password: hashPassword } = req.user;
      
      await passwordService.compare(editPassword,hashPassword);
      
      next();
    } catch (err) {
      next(err);
    }
  },
  
  checkUserId: async (req, res, next) => {
    try {
      const { id } = req.params;
      const isIdValid = Types.ObjectId.isValid( id );
      
      if (!isIdValid) {
        next(badRequest);
        return;
      }
      
      const userById = await User.findById(id).lean();
  
      if (!userById) {
        next(idNotExist);
        return;
      }
      
      req.user = userById;
      next();
    } catch (err) {
      next(err);
    }
  }

};
