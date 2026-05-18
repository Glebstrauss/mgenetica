module.exports = async function (req) {
  const method = (req && (req.method || req.httpMethod)) || 'GET';
  if (method === 'POST') {
    const body = req.body || (req.payload ? req.payload : {});
    const { quizId, answers } = body || {};
    if (!quizId || !Array.isArray(answers)) return { status: 400, error: 'quizId and answers required' };
    const score = answers.reduce((s, a) => s + (a === true ? 1 : 0), 0);
    return { quizId, score, total: answers.length };
  }
  return [{ id: 1, course_id: 1, title: 'Quiz: Introdução', questions: 3 }];
};
