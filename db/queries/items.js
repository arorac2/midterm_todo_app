const db = require('../connection');

//get all items
const getItems = () => {

};

//get item by ID

const getItemById = id => {

};

//get items by category ID
const getItemsByCategoryId = categoryId => {

  const query = `SELECT items.id, items.title, items.description
  FROM items
  JOIN items_categories ON items.id = items_categories.item_id
  WHERE items_categories.category_id = $1;
  `;

  return db.query(query, [categoryId])
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });

};

//get items by User ID
const getItemsByUserId = userId => {

};

//add item
const addItem = (title, description, completed, userId, important) => {

};

//delete item
const deleteItem = id => {

};

//update item. Expect an object
const updateItem = ({id, title, description, completed, userId, important}) => {

};
module.exports = { getItems, getItemById, getItemsByCategoryId, getItemsByUserId, addItem, deleteItem, updateItem};
