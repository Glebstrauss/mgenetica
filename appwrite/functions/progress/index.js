// Appwrite Function: progress
// GET / -> list progress for userId query param
// POST / -> record progress (mock implementation)

module.exports = async function (req, res) {
  try {
    const method = req.method || 'GET';
    if (method === 'POST') {
      const { userId, courseId, percent } = req.body || {};
      if (!userId || !courseId) return res.status(400).json({ error: 'userId and courseId required' });
      // In a production setup, use Appwrite Databases to persist progress
      return res.json({ ok: true, userId, courseId, percent: percent || 0 });
    }
    // GET: return mocked progress for a user
    const url = new URL(req.url, 'http://localhost');
    const userId = url.searchParams.get('userId') || 'anonymous';
    return res.json({ userId, completed: [{ course_id: 1, percent: 50 }] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'internal_error' });
  }
};
