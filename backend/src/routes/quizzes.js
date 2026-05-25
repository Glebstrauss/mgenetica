const express = require('express');
const router = express.Router();

// Return list of quizzes (mocked)
router.get('/', async (req, res) => {
  res.json([
    { id: 1, course_id: 1, title: 'Quiz: Introdução', questions: 3 }
  ]);
});

// Submit answers -> return score (very simple)
router.post('/submit', async (req, res) => {
  const { quizId, answers } = req.body || {};
  if (!quizId || !Array.isArray(answers)) return res.status(400).json({ error: 'quizId and answers required' });
  if (answers.length > 50) return res.status(400).json({ error: 'too_many_answers' });
  const score = answers.reduce((s,a)=>s + (a===true?1:0), 0);
  res.json({ quizId, score, total: answers.length });
});

module.exports = router;
