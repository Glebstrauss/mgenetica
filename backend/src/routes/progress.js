const express = require('express');
const router = express.Router();

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  if (String(req.user) !== String(userId) && req.role !== 'admin') {
    return res.status(403).json({ error: 'forbidden' });
  }
  res.json({ userId, completed: [{ course_id: 1, percent: 50 }] });
});

router.post('/', async (req, res) => {
  const { userId, courseId, percent } = req.body || {};
  if (!userId || !courseId) return res.status(400).json({ error: 'userId and courseId required' });
  if (String(req.user) !== String(userId) && req.role !== 'admin') {
    return res.status(403).json({ error: 'forbidden' });
  }
  const numericPercent = Number(percent);
  const boundedPercent = Number.isFinite(numericPercent) ? Math.max(0, Math.min(100, Math.round(numericPercent))) : 0;
  res.json({ ok: true, userId, courseId, percent: boundedPercent });
});

module.exports = router;
