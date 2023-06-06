const db = require('../connection');


// Get all users
const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    })    .catch((err) => {
      console.log(err.message);
    });
};

//Get users by ID
const getUsersByID = id => {
  const query = `SELECT * FROM users WHERE id = $1`;

  return db.query(query, [id])
    .then(data =>{
      return data.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

//Get users by email
const getUsersByEmail = email => {
  const query = `SELECT * FROM users WHERE email = $1`;

  return db.query(query, [email])
    .then(data =>{
      return data.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

//Delete user by ID
const deleteUser = id => {

  const query = `DELETE FROM users WHERE id = $1`;

  return db.query(query, [id])
    .catch((err) => {
      console.log(err.message);
    });

};

// Add user
const addUser = (name, email, password) => {
  const query = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *`;

  const values = [name, email, password];

  return db.query(query, values)
    .then(data => {
      return data.rows[0];
    })
    .catch(err => {
      console.log(err.message);
    });
};

//update user by ID. expects object. This should be safe as no user input is supplied.
const updateUser = ({ id, name, email, password }) => {

  const params = [];
  let paramIndex = 1;

  let setClause = '';
  if (name !== null && name !== undefined) {
    setClause += `name = $${paramIndex++}, `;
    params.push(name);
  }
  if (email !== null && email !== undefined) {
    setClause += `email = $${paramIndex++}, `;
    params.push(email);
  }
  if (password !== null && password !== undefined) {
    setClause += `password = $${paramIndex++}, `;
    params.push(password);
  }

  setClause = setClause.slice(0, -2);

  const query = `
    UPDATE users
    SET ${setClause}
    WHERE id = $${paramIndex}
    RETURNING *`;

  params.push(id);

  return db.query(query, params)
    .then(data =>{
      return data.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};


module.exports = { getUsers, getUsersByID, getUsersByEmail, deleteUser, updateUser, addUser };
