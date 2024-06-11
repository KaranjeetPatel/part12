const express = require('express');
const router = express.Router();
const redis = require('../redis');

// get statistics => number of todos in db  
router.get('/', async (_, res) => {
  const count = await redis.getAsync('added_todos');

  return res.json({ added_todos: Number(count) || 0 });
});

module.exports = router;