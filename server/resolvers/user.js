const { User } = require('../models');

const user = async (_, { userId }) => {
  try {
    const userFromDatabase = await User.findById(userId);
    console.log(user);
    return userFromDatabase;
  } catch (err) {
    console.log(`[ERROR]: Failed to get user | ${err.message}`);
    throw new ApolloError('Failed to get user');
  }
};
module.exports = user;
