const router = require('express').Router();

const userController = require('../controllers/user.controller');
const middleware = require('../middlewares/user.middleware')

router.post(
  '/',
  middleware.isUserFieldsValid,
  middleware.checkRepeatPassword,
  middleware.checkUserName,
  middleware.checkEmail,
  middleware.hashPassword,
  userController.createUser
);
router.get(
  '/',
  userController.getUser
);

router.get(
  '/:id',
  middleware.checkUserId,
  userController.getUserById
);
router.patch(
  '/:id',
  middleware.isUserFieldsValid,
  middleware.checkRepeatPassword,
  middleware.checkUserId,
  middleware.checkEditPassword,
  userController.updateUser
);
router.delete(
  '/:id',
  middleware.checkUserId,
  userController.deleteUser
);

module.exports = router;