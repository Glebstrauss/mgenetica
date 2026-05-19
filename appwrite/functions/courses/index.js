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
  const payload = [
    { id: 1, slug: 'intro-genetics', title: 'Introdução à Genética', description: 'Fundamentos da genética para iniciantes', published: true },
    { id: 2, slug: 'dna-sequencing', title: 'Sequenciamento de DNA', description: 'Conceitos e técnicas de sequenciamento', published: false }
  ];
  try {
    if (action === 'list') {
      context.log(JSON.stringify(payload));
      return { status: 200, body: JSON.stringify(payload) };
    }
    const out = { error: 'unsupported_action', action };
    context.log(JSON.stringify(out));
    return { status: 400, body: JSON.stringify(out) };
  } catch (e) {
    console.error(e);
  }
  return { status: 500, body: JSON.stringify({ error: 'internal_error' }) };
};
