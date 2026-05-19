const catalog = require('./catalog.generated.json');

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

  try {
    if (action === 'list') {
      const payload = catalog.map((course) => ({
        id: course.id,
        order: course.order,
        legacyId: course.legacyId,
        blockId: course.blockId,
        blockTitle: course.blockTitle,
        title: course.title,
        description: course.description,
        published: !!course.published
      }));
      context.log(JSON.stringify({ count: payload.length }));
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
