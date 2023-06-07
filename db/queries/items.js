const db = require('../connection');

//get all items
const getItems = () => {
  return db.query('SELECT * FROM items;')
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

//get item by ID

const getItemById = id => {
  const query = `SELECT * FROM items WHERE id = $1`;

  return db.query(query, [id])
    .then(data => {
      return data.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
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
  const query = `SELECT items.id, items.title, items.description FROM items WHERE user_id = $1`;

  return db.query(query, [userId])
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

//add item
const addItem = (title, userId, categoryId, description = null, completed = null, important = false) => {
  const query = `
    INSERT INTO items (title, description, completed, user_id, important)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`;

  return db.query(query, [title, description, completed, userId, important])
    .then(data => {

      console.log("Inserting Item");
      const item = data.rows[0];

      let ids = "";

      for (let i = 0; i < categoryId.length; i++) {
        const value = categoryId[i];
        ids += `(${item.id}, ${value})`;

        if (i !== categoryId.length - 1) {
          ids += ',';
        }
      }

      const itemCategoryIdQuery = `
        INSERT INTO items_categories (item_id, category_id)
        VALUES ${ids}`;

      return db.query(itemCategoryIdQuery)
        .then(() => {
          console.log("Inserting Glue");
          return { title: item.title, categoryId: categoryId };
        })
        .catch(err => {
          console.log(err.query);
          console.log(err.message);
          return { item };
        });
    })
    .catch((err) => {
      console.log(err.message);
    });
};




//delete item
const deleteItem = id => {
  const query = `DELETE FROM items WHERE id = $1`;

  return db.query(query, [id])
    .catch((err) => {
      console.log(err.message);
    });
};

//update item. Expect an object
const updateItem = ({ id, title, description, completed, userId, important }) => {
  const query = `
    UPDATE items
    SET title = $1, description = $2, updated_at = CURRENT_TIMESTAMP, completed = $3, user_id = $4, important = $5
    WHERE id = $6
    RETURNING *`;

  return db.query(query, [title, description, completed, userId, important, id])
    .then(data => {
      return data.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { getItems, getItemById, getItemsByCategoryId, getItemsByUserId, addItem, deleteItem, updateItem };
