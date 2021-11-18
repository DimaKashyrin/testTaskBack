module.exports = {
  userNormalizer: (userToNormalize = {}) => {
    const fieldsToRemove = ['password','createdAt','updatedAt','__v'];
    
    fieldsToRemove.forEach((field) => {
      delete userToNormalize[field];
    });
    
    return userToNormalize;
  }
};
