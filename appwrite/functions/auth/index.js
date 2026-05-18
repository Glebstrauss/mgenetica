module.exports = async function (context) {
  try {
    const req = context.req || {};
    const method = (req.method || req.httpMethod) || 'GET';
    if (method === 'POST') {
      const body = req.body || (req.payload ? req.payload : {});
      const { email } = body || {};
      if (!email) {
        const err = { error: 'email required', status: 400 };
        context.log(JSON.stringify(err));
        return { status: 400, body: JSON.stringify(err) };
      }
      const payload = { ok: true, message: 'Use Appwrite Account.createSession on the client for auth flows' };
      context.log(JSON.stringify(payload));
      return { status: 200, body: JSON.stringify(payload) };
    }
    const payload = { info: 'Auth functions should use Appwrite Accounts directly from the client' };
    context.log(JSON.stringify(payload));
    return { status: 200, body: JSON.stringify(payload) };
  } catch (err) {
    console.error(err);
    const out = { error: 'internal_error' };
    context.log(JSON.stringify(out));
    return { status: 500, body: JSON.stringify(out) };
  }
};
