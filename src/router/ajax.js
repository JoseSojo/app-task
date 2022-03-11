const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  await res.json('Jose Sojo');
})

module.exports = router;
