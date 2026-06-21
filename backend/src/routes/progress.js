const express = require('express');
const quizBank = require('../../../appwrite/functions/quizzes/quiz-bank.generated.json');

const router = express.Router();

function normalizeCourseId(courseId) {
  const raw = String(courseId || '').trim();
  if (/^module-\d{2}$/.test(raw)) return raw;
  if (/^\d+$/.test(raw)) return `module-${String(raw).padStart(2, '0')}`;
  return '';
}

function scoreProgress(courseId, answers) {
  const normalizedCourseId = normalizeCourseId(courseId);
  const quiz = quizBank.find((item) => item.id === normalizedCourseId);
  if (!quiz) return { ok: false, status: 404, error: 'quiz_not_found' };
  if (!Array.isArray(answers)) return { ok: false, status: 400, error: 'answers_required' };
  if (answers.length !== quiz.questions.length) return { ok: false, status: 400, error: 'answers_length_mismatch' };

  const score = quiz.questions.reduce((total, question, index) => {
    const selected = Number(answers[index]);
    const valid = Number.isInteger(selected) && selected >= 0 && selected < question.options.length;
    return total + (valid && selected === question.correct ? 1 : 0);
  }, 0);
  const percent = Math.round((score / quiz.questions.length) * 100);
  return {
    ok: true,
    courseId: normalizedCourseId,
    score,
    total: quiz.questions.length,
    passMark: quiz.passMark,
    passed: score >= quiz.passMark,
    percent
  };
}

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  if (String(req.user) !== String(userId) && req.role !== 'admin') {
    return res.status(403).json({ error: 'forbidden' });
  }
  res.json({ userId, completed: [] });
});

router.post('/', async (req, res) => {
  const { userId, courseId, answers } = req.body || {};
  if (!userId || !courseId) return res.status(400).json({ error: 'userId and courseId required' });
  if (String(req.user) !== String(userId) && req.role !== 'admin') {
    return res.status(403).json({ error: 'forbidden' });
  }
  if (Object.prototype.hasOwnProperty.call(req.body || {}, 'percent')) {
    return res.status(400).json({ error: 'client_percent_rejected' });
  }

  const result = scoreProgress(courseId, answers);
  if (!result.ok) return res.status(result.status).json({ error: result.error });
  res.json({ ok: true, userId, ...result });
});

module.exports = router;
module.exports.normalizeCourseId = normalizeCourseId;
module.exports.scoreProgress = scoreProgress;
