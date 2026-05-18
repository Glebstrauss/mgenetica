const express = require('express');
const router = express.Router();

// Simple in-db progress endpoints (mocked to use no DB writes yet)
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  // In a real impl, query DB for user progress
  res.json({ userId, completed: [{ course_id: 1, percent: 50 }] });
});

router.post('/', async (req, res) => {
  const { userId, courseId, percent } = req.body || {};
  if (!userId || !courseId) return res.status(400).json({ error: 'userId and courseId required' });
  // Persisting to DB not implemented in scaffold
  res.json({ ok: true, userId, courseId, percent: percent || 0 });
});

module.exports = router;
