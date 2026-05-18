module.exports = async function (req) {
  try {
    const method = (req && (req.method || req.httpMethod)) || 'GET';
    if (method === 'POST') {
      const body = req.body || (req.payload ? req.payload : {});
      const { quizId, answers } = body || {};
      if (!quizId || !Array.isArray(answers)) {
        const err = { error: 'quizId and answers required', status: 400 };
        console.log(JSON.stringify(err));
        return;
      }
      const score = answers.reduce((s, a) => s + (a === true ? 1 : 0), 0);
      const payload = { quizId, score, total: answers.length };
      console.log(JSON.stringify(payload));
      return;
    }
    const payload = [{ id: 1, course_id: 1, title: 'Quiz: Introdução', questions: 3 }];
    console.log(JSON.stringify(payload));
    return;
  } catch (err) {
    console.error(err);
    console.log(JSON.stringify({ error: 'internal_error' }));
    return;
  }
};
