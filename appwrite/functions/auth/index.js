module.exports = async function (req) {
  try {
    const method = (req && (req.method || req.httpMethod)) || 'GET';
    if (method === 'POST') {
      const body = req.body || (req.payload ? req.payload : {});
      const { email } = body || {};
      if (!email) {
        const err = { error: 'email required', status: 400 };
        console.log(JSON.stringify(err));
        return;
      }
      const payload = { ok: true, message: 'Use Appwrite Account.createSession on the client for auth flows' };
      console.log(JSON.stringify(payload));
      return;
    }
    const payload = { info: 'Auth functions should use Appwrite Accounts directly from the client' };
    console.log(JSON.stringify(payload));
    return;
  } catch (err) {
    console.error(err);
    console.log(JSON.stringify({ error: 'internal_error' }));
    return;
  }
};
