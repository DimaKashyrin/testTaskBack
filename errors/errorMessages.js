module.exports = {
  ok:{
    message: 'ok',
    status: 200
  },
  created: {
    message:'created',
    status: 201,
  },
  noContent: {
    message: 'No Content',
    status: 204
  },
  badRequest: {
    message:'Bad Request!',
    status: 400,
  },
  dontMatched: {
    message:'wrong password',
    status: 400,
  },
  differentPassword: {
    message: 'you have entered different passwords',
    status: 400
  },
  notFound: {
    message:'Not Found',
    status: 404,
  },
  idNotExist: {
    message:'the user with the specified id does not exist',
    status: 404,
  },
  alreadyExistEmail: {
    message:'Email already exist',
    status: 409,
  },
  alreadyExistUserName: {
    message:'User name already exist',
    status: 409,
  },
  
};
