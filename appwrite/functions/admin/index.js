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

function readAdminEmails() {
  return String(process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
}

function currentAppwriteConfig() {
  return {
    endpoint: process.env.APPWRITE_FUNCTION_ENDPOINT || process.env.APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1',
    projectId: process.env.APPWRITE_FUNCTION_PROJECT_ID || process.env.APPWRITE_PROJECT_ID || '6a0b2fc1001c380eeb26',
    apiKey: process.env.APPWRITE_ADMIN_API_KEY || process.env.APPWRITE_API_KEY || ''
  };
}

async function appwriteAdminGet(pathname) {
  const { endpoint, projectId, apiKey } = currentAppwriteConfig();
  if (!apiKey) {
    return {
      ok: false,
      error: 'missing_admin_api_key',
      hint: 'Configure APPWRITE_ADMIN_API_KEY or APPWRITE_API_KEY in the Appwrite function variables to enable admin summary.'
    };
  }

  const res = await fetch(`${endpoint}${pathname}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Appwrite-Project': projectId,
      'X-Appwrite-Key': apiKey
    }
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    return {
      ok: false,
      error: data?.message || 'appwrite_admin_request_failed',
      status: res.status
    };
  }

  return { ok: true, data };
}

function makeStatusPayload(userEmail) {
  const adminEmails = readAdminEmails();
  const { endpoint, projectId, apiKey } = currentAppwriteConfig();
  return {
    ok: true,
    capabilities: {
      auth: ['create-account', 'login', 'logout', 'get-account'],
      learner: ['list-courses', 'submit-quiz', 'track-progress'],
      admin: ['status', 'summary']
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
      endpoint,
      projectId,
      adminApiConfigured: Boolean(apiKey)
    },
    user: {
      email: userEmail || null,
      isAdmin: userEmail ? adminEmails.includes(userEmail) : false
    },
    checks: {
      configuredAdminEmails: adminEmails.length
    }
  };
}

module.exports = async function (context) {
  try {
    const req = context.req || {};
    const body = parseBody(req);
    const headers = req.headers || {};
    const action = body.action || 'status';
    const userEmail = String(
      headers['x-appwrite-user-email'] ||
      headers['X-Appwrite-User-Email'] ||
      body.email ||
      ''
    ).trim().toLowerCase();

    const statusPayload = makeStatusPayload(userEmail);

    if (action === 'status') {
      context.log(JSON.stringify(statusPayload));
      return { status: 200, body: JSON.stringify(statusPayload) };
    }

    if (action === 'summary') {
      if (!statusPayload.user.isAdmin) {
        const payload = {
          ...statusPayload,
          ok: false,
          error: 'admin_required'
        };
        context.log(JSON.stringify(payload));
        return { status: 403, body: JSON.stringify(payload) };
      }

      const users = await appwriteAdminGet('/users?limit=1');
      const functions = await appwriteAdminGet('/functions?limit=100');
      const payload = {
        ...statusPayload,
        summary: {
          usersTotal: users.ok ? users.data?.total ?? null : null,
          functionsTotal: functions.ok ? functions.data?.total ?? null : null,
          users,
          functions
        }
      };
      context.log(JSON.stringify(payload));
      return { status: 200, body: JSON.stringify(payload) };
    }

    const payload = { error: 'unsupported_action', action };
    context.log(JSON.stringify(payload));
    return { status: 400, body: JSON.stringify(payload) };
  } catch (err) {
    console.error(err);
    const out = { error: 'internal_error', message: err.message || 'unknown_error' };
    context.log(JSON.stringify(out));
    return { status: 500, body: JSON.stringify(out) };
  }
};
