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
  try {
    const req = context.req || {};
    const body = parseBody(req);
    const action = body.action || 'capabilities';
    if (action === 'capabilities') {
      const payload = {
        ok: true,
        authStrategy: 'appwrite-account-rest',
        flows: ['create-account', 'email-login', 'logout', 'get-account'],
        notes: [
          'Use Appwrite REST /account on client for sign-up.',
          'Use Appwrite REST /account/sessions/email on client for login.',
          'Add deployed host to Appwrite Web Platforms before production auth tests.'
        ]
      };
      context.log(JSON.stringify(payload));
      return { status: 200, body: JSON.stringify(payload) };
    }
    const payload = { error: 'unsupported_action', action };
    context.log(JSON.stringify(payload));
    return { status: 400, body: JSON.stringify(payload) };
  } catch (err) {
    console.error(err);
    const out = { error: 'internal_error' };
    context.log(JSON.stringify(out));
    return { status: 500, body: JSON.stringify(out) };
  }
};
