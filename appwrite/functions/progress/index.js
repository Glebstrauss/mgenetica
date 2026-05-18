module.exports = async function (req) {
  const method = (req && (req.method || req.httpMethod)) || 'GET';
  if (method === 'POST') {
    const body = req.body || (req.payload ? req.payload : {});
    const { userId, courseId, percent } = body || {};
    if (!userId || !courseId) return { status: 400, error: 'userId and courseId required' };
    return { ok: true, userId, courseId, percent: percent || 0 };
  }
  const url = new URL((req && (req.url || req.path)) || 'http://localhost/', 'http://localhost');
  const userId = url.searchParams.get('userId') || 'anonymous';
  return { userId, completed: [{ course_id: 1, percent: 50 }] };
};
