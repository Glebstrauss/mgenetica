// Appwrite Function (Node.js) - quizzes
// Example: simple HTTP function returning quizzes or scoring answers

module.exports = async function (req, res) {
  try {
    const method = req.method || 'GET';
    if (method === 'POST') {
      const { quizId, answers } = req.body || {};
      if (!quizId || !Array.isArray(answers)) return res.status(400).json({ error: 'quizId and answers required' });
      const score = answers.reduce((s, a) => s + (a === true ? 1 : 0), 0);
      return res.json({ quizId, score, total: answers.length });
    }
    // GET: list quizzes
    return res.json([{ id: 1, course_id: 1, title: 'Quiz: Introdução', questions: 3 }]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'internal_error' });
  }
};
