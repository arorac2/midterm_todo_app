const express = require('express');
const router = express.Router();
const items = require('../db/queries/items');
const { chat } = require('../lib/openAI');

// GET all items
router.get('/', (req, res) => {

  const uID = req.session["user_id"];
  console.log("userid: ",uID);

  items.getItemsByUserId(uID)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'An error occurred' });
    });
});

// POST add item
router.post('/', (req, res) => {
  let item = req.body;
  const uID = req.session["user_id"];

  console.log("newItem: ",item);

  const categoryIds = {
    'to-eat': 3,
    'to-buy': 2,
    'to-read': 4,
    'to-watch': 1
  };

  const categories = [];
  const keys = Object.keys(categoryIds);

  keys.forEach((key) => {
    if (item[key] === 'on') {
      categories.push(categoryIds[key]);
    }
  });


  console.log("categories: ",categories);

  items.addItem(item.title, uID, categories, item.description)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'An error occurred' });
    });


  // console.log('body: ', req.body);
  // chat(req.body.item)
  //   .then((aiResponse) => {
  //     console.log(req.body);
  //     item = aiResponse;
  //     console.log('item:', item);
  //     items.addItem(item.item, 1, item.categoryId)
  //       .then(data => {
  //         res.json(data);
  //       })
  //       .catch(err => {
  //         console.log(err);
  //         res.status(500).json({ error: 'An error occurred' });
  //       });
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //     res.status(500).json({ error: 'An error occurred' });
  //   });
});

// DELETE item by ID
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  items.deleteItem(id)
    .then(() => {
      res.json({ message: 'Item deleted successfully' });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'An error occurred' });
    });
});

// PUT update item by ID
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { title, description, completed, userId, important } = req.body;
  const updatedItem = {
    id,
    title,
    description,
    completed,
    userId,
    important
  };
  items.updateItem(updatedItem)
    .then(data => {
      if (data) {
        res.json(data);
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'An error occurred' });
    });
});


module.exports = router;
