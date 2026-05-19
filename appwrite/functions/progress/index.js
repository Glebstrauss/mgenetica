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

function readUser(headers) {
  return {
    id: String(headers['x-appwrite-user-id'] || headers['X-Appwrite-User-Id'] || '').trim(),
    email: String(headers['x-appwrite-user-email'] || headers['X-Appwrite-User-Email'] || '').trim().toLowerCase()
  };
}

module.exports = async function (context) {
  try {
    const req = context.req || {};
    const body = parseBody(req);
    const headers = req.headers || {};
    const user = readUser(headers);
    const action = body.action || 'get';
    if (!user.id) {
      const err = { error: 'auth_required', status: 401 };
      context.log(JSON.stringify(err));
      return { status: 401, body: JSON.stringify(err) };
    }
    if (body.userId && body.userId !== user.id) {
      const err = { error: 'user_mismatch', status: 403 };
      context.log(JSON.stringify(err));
      return { status: 403, body: JSON.stringify(err) };
    }
    if (action === 'update') {
      const { courseId, percent } = body || {};
      if (!courseId) {
        const err = { error: 'courseId required', status: 400 };
        context.log(JSON.stringify(err));
        return { status: 400, body: JSON.stringify(err) };
      }
      const normalizedPercent = Math.max(0, Math.min(100, Number(percent) || 0));
      const payload = { ok: true, userId: user.id, courseId, percent: normalizedPercent };
      context.log(JSON.stringify(payload));
      return { status: 200, body: JSON.stringify(payload) };
    }
    const payload = { userId: user.id, completed: [{ course_id: 1, percent: 50 }] };
    context.log(JSON.stringify(payload));
    return { status: 200, body: JSON.stringify(payload) };
  } catch (err) {
    console.error(err);
    const out = { error: 'internal_error' };
    context.log(JSON.stringify(out));
    return { status: 500, body: JSON.stringify(out) };
  }
};
