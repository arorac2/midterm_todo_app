const db = require('../connection');

//Get all categories
const getCategories = () => {
  return db.query('SELECT * FROM categories;')
    .then(data => {
      return data.rows;
    });
};

//Get category/categories by ID/IDs
const getCategoryById = ids => {
  const idArray = ids.split(',').map(Number);

  let placeholders = '';
  for (let i = 1; i <= idArray.length; i++) {
    placeholders += `$${i},`;
  }
  placeholders = placeholders.slice(0, -1); // remove the last comma

  const query = `SELECT * FROM categories WHERE id IN (${placeholders})`;

  return db.query(query, idArray)
    .then(data =>{
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};



//delete category by ID
const deleteCategory = id => {

  const query = `DELETE FROM categories WHERE id = $1;`;
  console.log("Hello world");

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
    RETURNING *;`;

  return db.query(query, [title, id])
    .catch((err) => {
      console.log(err.message);
    });
};


module.exports = {getCategories, getCategoryById, deleteCategory, updateCategory};

