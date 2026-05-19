module.exports = async function (context) {
  try {
    const req = context.req || {};
    const body = req.body || req.payload || {};
    const headers = req.headers || {};
    const adminEmails = String(process.env.ADMIN_EMAILS || '')
      .split(',')
      .map((item) => item.trim().toLowerCase())
      .filter(Boolean);
    const userEmail = String(
      headers['x-appwrite-user-email'] ||
      headers['X-Appwrite-User-Email'] ||
      body.email ||
      ''
    ).trim().toLowerCase();

    const payload = {
      ok: true,
      capabilities: {
        auth: ['create-account', 'login', 'logout', 'get-account'],
        learner: ['list-courses', 'submit-quiz', 'track-progress'],
        admin: ['status']
      },
      runtime: 'node-22',
      functions: {
        courses: 'mgenetica_courses_fn',
        quizzes: 'mgenetica_quizzes_fn',
        progress: 'mgenetica_progress_fn',
        auth: 'mgenetica_auth_fn',
        admin: 'mgenetica_admin_fn'
      },
      appwrite: {
        endpoint: process.env.APPWRITE_FUNCTION_ENDPOINT || 'https://fra.cloud.appwrite.io/v1',
        projectId: process.env.APPWRITE_FUNCTION_PROJECT_ID || '6a0b2fc1001c380eeb26'
      },
      user: {
        email: userEmail || null,
        isAdmin: userEmail ? adminEmails.includes(userEmail) : false
      },
      checks: {
        configuredAdminEmails: adminEmails.length
      }
    };

    context.log(JSON.stringify(payload));
    return { status: 200, body: JSON.stringify(payload) };
  } catch (err) {
    console.error(err);
    const out = { error: 'internal_error' };
    context.log(JSON.stringify(out));
    return { status: 500, body: JSON.stringify(out) };
  }
};
