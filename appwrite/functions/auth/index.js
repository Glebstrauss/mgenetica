// Appwrite Function: auth
// Light wrapper to demonstrate issuing tokens via Appwrite (real auth handled by Appwrite Auth)

module.exports = async function (req, res) {
  try {
    const method = req.method || 'GET';
    if (method === 'POST') {
      const { email } = req.body || {};
      if (!email) return res.status(400).json({ error: 'email required' });
      // In Appwrite, use the built-in Account API to create sessions
      return res.json({ ok: true, message: 'Use Appwrite Account.createSession on the client for auth flows' });
    }
    return res.json({ info: 'Auth functions should use Appwrite Accounts directly from the client' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'internal_error' });
  }
};
