module.exports = async function (req) {
  try {
    const method = (req && (req.method || req.httpMethod)) || 'GET';
    if (method === 'POST') {
      const body = req.body || (req.payload ? req.payload : {});
      const { userId, courseId, percent } = body || {};
      if (!userId || !courseId) {
        const err = { error: 'userId and courseId required', status: 400 };
        console.log(JSON.stringify(err));
        return;
      }
      const payload = { ok: true, userId, courseId, percent: percent || 0 };
      console.log(JSON.stringify(payload));
      return;
    }
    const url = new URL((req && (req.url || req.path)) || 'http://localhost/', 'http://localhost');
    const userId = url.searchParams.get('userId') || 'anonymous';
    const payload = { userId, completed: [{ course_id: 1, percent: 50 }] };
    console.log(JSON.stringify(payload));
    return;
  } catch (err) {
    console.error(err);
    console.log(JSON.stringify({ error: 'internal_error' }));
    return;
  }
};
