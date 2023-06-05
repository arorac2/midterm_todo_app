const getUserByEmail = (email, users) => {
  console.log("here are the users: ", users);
  for (const user of users) {
    if (user.email === email) {
      console.log("Look! :", user);
      return user;
    }
  }
  return undefined;
};

module.exports = { getUserByEmail };
