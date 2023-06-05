const db = require('../connection');

//Get all categories
const getCategories = () => {
  return db.query('SELECT * FROM categories;')
    .then(data => {
      return data.rows;
    });
};

//Get category by ID
const getCategoryById = id => {
  const query = `SELECT * FROM categories WHERE id = $1`;

  return db.query(query, [id])
    .then(data =>{
      return data.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

//delete category by ID
const deleteCategory = id => {

  const query = `DELETE FROM categories WHERE id = $1`;

  return db.query(query, [id])
    .catch((err) => {
      console.log(err.message);
    });

};

//update category by ID
const updateCategory = (id, title) => {
  const query = `
    UPDATE categories
    SET title = $1
    WHERE id = $2
    RETURNING *`;

  return db.query(query, [title, id]);
};
