module.exports = async function (req) {
  const method = (req && (req.method || req.httpMethod)) || 'GET';
  if (method === 'POST') {
    const body = req.body || (req.payload ? req.payload : {});
    const { email } = body || {};
    if (!email) return { status: 400, error: 'email required' };
    return { ok: true, message: 'Use Appwrite Account.createSession on the client for auth flows' };
  }
  return { info: 'Auth functions should use Appwrite Accounts directly from the client' };
};
