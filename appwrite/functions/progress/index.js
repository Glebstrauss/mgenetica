module.exports = async function (context) {
  try {
    const req = context.req || {};
    const method = (req.method || req.httpMethod) || 'GET';
    if (method === 'POST') {
      const body = req.body || (req.payload ? req.payload : {});
      const { userId, courseId, percent } = body || {};
      if (!userId || !courseId) {
        const err = { error: 'userId and courseId required', status: 400 };
        context.log(JSON.stringify(err));
        return { status: 400, body: JSON.stringify(err) };
      }
      const payload = { ok: true, userId, courseId, percent: percent || 0 };
      context.log(JSON.stringify(payload));
      return { status: 200, body: JSON.stringify(payload) };
    }
    const url = new URL((req && (req.url || req.path)) || 'http://localhost/', 'http://localhost');
    const userId = url.searchParams.get('userId') || 'anonymous';
    const payload = { userId, completed: [{ course_id: 1, percent: 50 }] };
    context.log(JSON.stringify(payload));
    return { status: 200, body: JSON.stringify(payload) };
  } catch (err) {
    console.error(err);
    const out = { error: 'internal_error' };
    context.log(JSON.stringify(out));
    return { status: 500, body: JSON.stringify(out) };
  }
};
