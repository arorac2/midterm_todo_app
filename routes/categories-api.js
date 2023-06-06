const express = require('express');
const router  = express.Router();
const db = require('../db/queries/categories');

// GET all items
router.get('/', (req, res) => {
  db.getCategories()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'An error occurred' });
    });
});

module.exports = router;
