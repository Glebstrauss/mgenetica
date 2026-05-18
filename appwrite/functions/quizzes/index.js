module.exports = async function (context) {
  try {
    const req = context.req || {};
    const method = (req.method || req.httpMethod) || 'GET';
    if (method === 'POST') {
      const body = req.body || (req.payload ? req.payload : {});
      const { quizId, answers } = body || {};
      if (!quizId || !Array.isArray(answers)) {
        const err = { error: 'quizId and answers required', status: 400 };
        context.log(JSON.stringify(err));
        return { status: 400, body: JSON.stringify(err) };
      }
      const score = answers.reduce((s, a) => s + (a === true ? 1 : 0), 0);
      const payload = { quizId, score, total: answers.length };
      context.log(JSON.stringify(payload));
      return { status: 200, body: JSON.stringify(payload) };
    }
    const payload = [{ id: 1, course_id: 1, title: 'Quiz: Introdução', questions: 3 }];
    context.log(JSON.stringify(payload));
    return { status: 200, body: JSON.stringify(payload) };
  } catch (err) {
    console.error(err);
    const out = { error: 'internal_error' };
    context.log(JSON.stringify(out));
    return { status: 500, body: JSON.stringify(out) };
  }
};
