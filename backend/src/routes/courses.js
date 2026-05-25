const express = require('express');

const router = express.Router();

router.get('/', async (_req, res) => {
  res.json([
    {
      id: 1,
      slug: 'intro-genetics',
      title: 'Introducao a Genetica',
      description: 'Fundamentos da genetica para iniciantes',
      published: true
    }
  ]);
});

module.exports = router;
