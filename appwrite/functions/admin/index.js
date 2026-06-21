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

function readAdminIds() {
  return String(process.env.ADMIN_USER_IDS || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function readUserEmail(headers) {
  return String(
    headers['x-appwrite-user-email'] ||
    headers['X-Appwrite-User-Email'] ||
    ''
  ).trim().toLowerCase();
}

function readUserId(headers) {
  return String(
    headers['x-appwrite-user-id'] ||
    headers['X-Appwrite-User-Id'] ||
    headers['x-appwrite-userid'] ||
    ''
  ).trim();
}

function currentAppwriteConfig() {
  return {
    endpoint: process.env.APPWRITE_FUNCTION_ENDPOINT || process.env.APPWRITE_ENDPOINT || '',
    projectId: process.env.APPWRITE_FUNCTION_PROJECT_ID || process.env.APPWRITE_PROJECT_ID || '',
    apiKey: process.env.APPWRITE_ADMIN_API_KEY || process.env.APPWRITE_API_KEY || process.env.APPWRITE_FUNCTION_API_KEY || ''
  };
}

const PROGRESS_PREFS_KEY = 'mgeneticaProgress';

async function appwriteAdminGet(pathname) {
  const { endpoint, projectId, apiKey } = currentAppwriteConfig();
  if (!endpoint || !projectId || !apiKey) {
    return {
      ok: false,
      error: 'missing_appwrite_config',
      hint: 'Configure APPWRITE_FUNCTION_ENDPOINT, APPWRITE_FUNCTION_PROJECT_ID, and an Appwrite API key to enable admin summary.'
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  let res;
  try {
    res = await fetch(`${endpoint}${pathname}`, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'X-Appwrite-Project': projectId,
        'X-Appwrite-Key': apiKey
      }
    });
  } finally {
    clearTimeout(timeout);
  }

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

function buildProgressSummary(usersPayload, adminEmails) {
  const users = Array.isArray(usersPayload?.users) ? usersPayload.users : [];
  const progressRecords = [];
  let trackedLearners = 0;

  for (const user of users) {
    const prefs = user?.prefs && typeof user.prefs === 'object' ? user.prefs : {};
    const progress = prefs[PROGRESS_PREFS_KEY];
    const courses = progress?.courses && typeof progress.courses === 'object' ? Object.values(progress.courses) : [];
    if (courses.length > 0) trackedLearners += 1;
    for (const course of courses) {
      if (!course || typeof course !== 'object') continue;
      progressRecords.push({
        userId: user.$id || user.id || null,
        courseId: course.courseId || null,
        percent: Number.isFinite(Number(course.percent)) ? Number(course.percent) : 0,
        passed: Boolean(course.passed),
        attempts: Number.isFinite(Number(course.attempts)) ? Number(course.attempts) : 0,
        updatedAt: course.updatedAt || null
      });
    }
  }

  const totalTrackedModules = progressRecords.length;
  const passedModules = progressRecords.filter((record) => record.passed).length;
  const completedModules = progressRecords.filter((record) => record.percent >= 100).length;
  const averagePercent = totalTrackedModules
    ? Math.round(progressRecords.reduce((sum, record) => sum + record.percent, 0) / totalTrackedModules)
    : 0;

  return {
    usersTotal: usersPayload?.total ?? null,
    learnerUsersTotal: users.filter((user) => !adminEmails.includes(String(user?.email || '').toLowerCase())).length,
    adminUsersTotal: users.filter((user) => adminEmails.includes(String(user?.email || '').toLowerCase())).length,
    trackedLearners,
    totalTrackedModules,
    passedModules,
    completedModules,
    averagePercent,
    recentProgress: progressRecords.sort((a, b) => String(b.updatedAt || '').localeCompare(String(a.updatedAt || ''))).slice(0, 8)
  };
}

function makeStatusPayload(userEmail, userId) {
  const adminEmails = readAdminEmails();
  const adminIds = readAdminIds();
  const { endpoint, apiKey } = currentAppwriteConfig();
  const isAdmin = Boolean(userEmail && adminEmails.includes(userEmail)) || Boolean(userId && adminIds.includes(userId));
  const basePayload = {
    ok: true,
    user: {
      authenticated: Boolean(userEmail),
      isAdmin
    }
  };

  if (!isAdmin) return basePayload;

  return {
    ...basePayload,
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
      adminApiConfigured: Boolean(apiKey)
    },
    checks: {
      adminEmailsConfigured: adminEmails.length > 0,
      adminUserIdsConfigured: adminIds.length > 0
    }
  };
}

module.exports = async function (context) {
  let action = 'unknown';
  try {
    const req = context.req || {};
    const body = parseBody(req);
    const headers = req.headers || {};
    action = body.action || 'status';
    const userId = readUserId(headers);
    const userEmail = readUserEmail(headers);
    const adminIds = readAdminIds();

    if (!userId || !userEmail) {
      const payload = {
        ok: false,
        error: 'auth_required',
        message: 'Authenticated Appwrite user required.'
      };
      context.log(JSON.stringify({ action, error: payload.error }));
      return { status: 401, body: JSON.stringify(payload) };
    }

    const statusPayload = makeStatusPayload(userEmail, userId);

    if (action === 'status') {
      context.log(JSON.stringify({ action, isAdmin: statusPayload.user.isAdmin }));
      return { status: 200, body: JSON.stringify(statusPayload) };
    }

    if (action === 'summary') {
      if (!statusPayload.user.isAdmin) {
        const payload = {
          ...statusPayload,
          ok: false,
          error: 'admin_required'
        };
        context.log(JSON.stringify({ action, error: payload.error }));
        return { status: 403, body: JSON.stringify(payload) };
      }

      const adminEmails = readAdminEmails();
      const users = await appwriteAdminGet('/users?limit=100');
      const functions = await appwriteAdminGet('/functions?limit=100');
      const payload = {
        ...statusPayload,
        summary: {
          usersTotal: users.ok ? users.data?.total ?? null : null,
          functionsTotal: functions.ok ? functions.data?.total ?? null : null,
          learnerProgress: users.ok ? buildProgressSummary(users.data, adminEmails) : null,
          users: users.ok ? { ok: true, total: users.data?.total ?? null } : users,
          functions: functions.ok ? { ok: true, total: functions.data?.total ?? null } : functions
        }
      };
      context.log(JSON.stringify({
        action,
        usersTotal: payload.summary.usersTotal,
        functionsTotal: payload.summary.functionsTotal,
        trackedLearners: payload.summary.learnerProgress?.trackedLearners ?? null
      }));
      return { status: 200, body: JSON.stringify(payload) };
    }

    const payload = { error: 'unsupported_action', action };
    context.log(JSON.stringify({ action, error: payload.error }));
    return { status: 400, body: JSON.stringify(payload) };
  } catch (err) {
    console.error(err);
    const out = { error: 'internal_error', message: err.message || 'unknown_error' };
    context.log(JSON.stringify({ action, error: out.error }));
    return { status: 500, body: JSON.stringify(out) };
  }
};
