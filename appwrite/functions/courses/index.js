const curriculum = require('./legacy-curriculum.generated.json');

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

module.exports = async function (context) {
  const req = context.req || {};
  const body = parseBody(req);
  const action = body.action || 'list';
  const userId = readUserId(req.headers || {});

  try {
    if (!userId) {
      const out = { ok: false, error: 'auth_required', message: 'Authenticated Appwrite user required.' };
      context.log(JSON.stringify(out));
      return { status: 401, body: JSON.stringify(out) };
    }

    if (action === 'list') {
      const payload = (curriculum.modules || []).map((course) => ({
        id: course.id,
        order: course.order,
        legacyId: course.legacyId,
        blockId: course.blockId,
        blockTitle: course.blockTitle,
        title: course.title,
        description: course.description || course.objective || course.feynmanQuestion || '',
        published: course.published !== false
      }));
      context.log(JSON.stringify({ count: payload.length }));
      return { status: 200, body: JSON.stringify(payload) };
    }

    if (action === 'detail') {
      const courseId = String(body.courseId || '').trim();
      if (!/^module-\d{2}$/.test(courseId)) {
        const out = { ok: false, error: 'invalid_course_id' };
        context.log(JSON.stringify(out));
        return { status: 400, body: JSON.stringify(out) };
      }
      const payload = (curriculum.modules || []).find((course) => course.id === courseId) || null;
      if (!payload) {
        const out = { ok: false, error: 'course_not_found', courseId };
        context.log(JSON.stringify(out));
        return { status: 404, body: JSON.stringify(out) };
      }
      context.log(JSON.stringify({ action, courseId }));
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
