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

function generateUniqueID() {
  const timestamp = Date.now().toString(); // Get current timestamp
  const random = Math.floor(Math.random() * 1000).toString(); // Generate random number
  return timestamp + random; // Combine timestamp and random number
}


module.exports = { getUserByEmail, generateUniqueID };
