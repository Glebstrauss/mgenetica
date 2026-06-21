const quizBank = require('./quiz-bank.generated.json');

function readUserId(headers = {}) {
  return String(headers['x-appwrite-user-id'] || headers['X-Appwrite-User-Id'] || headers['x-appwrite-userid'] || '').trim();
}

function parseBody(req) {
  const raw = req?.body ?? req?.payload ?? {};
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw);
    } catch (_) {
      return {};
    }
  }
  return raw && typeof raw === 'object' ? raw : {};
}

function getQuizByCourseId(courseId) {
  if (!/^module-\d{2}$/.test(String(courseId || ''))) return null;
  return quizBank.find((quiz) => quiz.id === courseId) || null;
}

module.exports = async function (context) {
  try {
    const req = context.req || {};
    const body = parseBody(req);
    const userId = readUserId(req.headers || {});
    const action = body.action || 'get';
    const courseId = body.courseId || body.quizId;
    const quiz = getQuizByCourseId(courseId);

    if (!userId) {
      const out = { ok: false, error: 'auth_required', message: 'Authenticated Appwrite user required.' };
      context.log(JSON.stringify(out));
      return { status: 401, body: JSON.stringify(out) };
    }

    if (!quiz) {
      const out = { error: 'quiz_not_found', courseId };
      context.log(JSON.stringify(out));
      return { status: 404, body: JSON.stringify(out) };
    }

    if (action === 'get') {
      const payload = {
        id: quiz.id,
        title: quiz.title,
        subtitle: quiz.subtitle,
        passMark: quiz.passMark,
        questions: quiz.questions.map((question, index) => ({
          id: index + 1,
          text: question.text,
          options: question.options
        }))
      };
      context.log(JSON.stringify({ courseId, action, questions: payload.questions.length }));
      return { status: 200, body: JSON.stringify(payload) };
    }

    if (action === 'submit') {
      if (!Array.isArray(body.answers)) {
        const out = { error: 'answers_required', courseId };
        context.log(JSON.stringify(out));
        return { status: 400, body: JSON.stringify(out) };
      }
      if (body.answers.length !== quiz.questions.length) {
        const out = { error: 'answers_length_mismatch', courseId };
        context.log(JSON.stringify(out));
        return { status: 400, body: JSON.stringify(out) };
      }

      const score = quiz.questions.reduce((total, question, index) => {
        const selected = Number(body.answers[index]);
        const validSelection = Number.isInteger(selected) && selected >= 0 && selected < question.options.length;
        return total + (validSelection && selected === question.correct ? 1 : 0);
      }, 0);
      const payload = {
        courseId,
        score,
        total: quiz.questions.length,
        passMark: quiz.passMark,
        passed: score >= quiz.passMark
      };
      context.log(JSON.stringify({ courseId, action, score, total: payload.total }));
      return { status: 200, body: JSON.stringify(payload) };
    }

    const out = { error: 'unsupported_action', action };
    context.log(JSON.stringify(out));
    return { status: 400, body: JSON.stringify(out) };
  } catch (error) {
    context.error?.(error);
    return { status: 500, body: JSON.stringify({ error: 'internal_error' }) };
  }
};
