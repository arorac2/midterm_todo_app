const express = require('express');
const router = express.Router();
const items = require('../db/queries/items');
const { chat } = require('../lib/openAI');

// POST item information from brain
router.post('/', (req, res) => {
  let item = {};
  console.log('body: ', req.body);
  chat(req.body.item)
    .then((aiResponse) => {
      console.log(req.body);
      item = aiResponse;
      console.log('item:', item);
      res.json(item);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    });
});

module.exports = router;
