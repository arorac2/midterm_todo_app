const express = require('express');
const router = express.Router();
const items = require('../models/items');

// GET all items
router.get('/', (req, res) => {
  items.getItems()
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
  const { title, description, completed, userId, important } = req.body;
  items.addItem(title, description, completed, userId, important)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'An error occurred' });
    });
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
