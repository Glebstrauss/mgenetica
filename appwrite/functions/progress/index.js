const PROGRESS_PREFS_KEY = 'mgeneticaProgress';

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

function currentAppwriteConfig() {
  return {
    endpoint: process.env.APPWRITE_FUNCTION_ENDPOINT || process.env.APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1',
    projectId: process.env.APPWRITE_FUNCTION_PROJECT_ID || process.env.APPWRITE_PROJECT_ID || '6a0b2fc1001c380eeb26',
    apiKey: process.env.APPWRITE_ADMIN_API_KEY || process.env.APPWRITE_API_KEY || ''
  };
}

function readUserIdentity(req) {
  const headers = req?.headers || {};
  return {
    id: headers['x-appwrite-user-id'] || headers['X-Appwrite-User-Id'] || headers['x-appwrite-userid'] || '',
    email: headers['x-appwrite-user-email'] || headers['X-Appwrite-User-Email'] || ''
  };
}

async function appwriteAdminRequest(pathname, { method = 'GET', payload } = {}) {
  const { endpoint, projectId, apiKey } = currentAppwriteConfig();
  if (!apiKey) {
    return {
      ok: false,
      status: 503,
      error: 'missing_admin_api_key',
      message: 'Configure APPWRITE_ADMIN_API_KEY or APPWRITE_API_KEY in the progress function environment.'
    };
  }

  const res = await fetch(`${endpoint}${pathname}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-Appwrite-Project': projectId,
      'X-Appwrite-Key': apiKey
    },
    body: payload ? JSON.stringify(payload) : undefined
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    return {
      ok: false,
      status: res.status,
      error: data?.type || data?.code || 'appwrite_request_failed',
      message: data?.message || 'Appwrite request failed.'
    };
  }

  return { ok: true, status: res.status, data };
}

function normalizePercent(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return 0;
  return Math.max(0, Math.min(100, Math.round(numeric)));
}

function sanitizeCourseRecord(courseId, input = {}, previous = null) {
  const now = new Date().toISOString();
  const percent = normalizePercent(input.percent);
  const quizScore = Number.isFinite(Number(input.quizScore)) ? Number(input.quizScore) : null;
  const quizTotal = Number.isFinite(Number(input.quizTotal)) ? Number(input.quizTotal) : null;
  const passMark = Number.isFinite(Number(input.passMark)) ? Number(input.passMark) : null;
  const passed = typeof input.passed === 'boolean' ? input.passed : percent >= 100;
  const previousAttempts = Number.isFinite(Number(previous?.attempts)) ? Number(previous.attempts) : 0;
  const incrementAttempts = input.incrementAttempts !== false;
  const attempts = incrementAttempts ? previousAttempts + 1 : Math.max(previousAttempts, 1);

  return {
    courseId,
    percent,
    quizScore,
    quizTotal,
    passMark,
    passed,
    attempts,
    lastSubmittedAt: input.lastSubmittedAt || now,
    completedAt: passed ? previous?.completedAt || input.completedAt || now : null,
    updatedAt: now
  };
}

function normalizeProgressBlob(blob) {
  const source = blob && typeof blob === 'object' ? blob : {};
  const courses = source.courses && typeof source.courses === 'object' ? source.courses : {};
  return {
    version: 1,
    updatedAt: source.updatedAt || null,
    courses
  };
}

function buildProgressResponse(userId, progress) {
  const normalized = normalizeProgressBlob(progress);
  const records = Object.values(normalized.courses)
    .filter(Boolean)
    .sort((a, b) => String(b.updatedAt || '').localeCompare(String(a.updatedAt || '')));
  const totalCoursesTracked = records.length;
  const passedCourses = records.filter((record) => record.passed).length;
  const completedCourses = records.filter((record) => record.percent >= 100).length;
  const averagePercent = totalCoursesTracked
    ? Math.round(records.reduce((sum, record) => sum + normalizePercent(record.percent), 0) / totalCoursesTracked)
    : 0;

  return {
    ok: true,
    storage: 'appwrite-user-prefs',
    userId,
    progress: normalized,
    records,
    summary: {
      totalCoursesTracked,
      passedCourses,
      completedCourses,
      averagePercent,
      lastUpdatedAt: records[0]?.updatedAt || normalized.updatedAt || null
    }
  };
}

module.exports = async function (context) {
  try {
    const req = context.req || {};
    const body = parseBody(req);
    const action = body.action || 'get';
    const user = readUserIdentity(req);

    if (!user.id) {
      const payload = { ok: false, error: 'auth_required', message: 'Authenticated Appwrite user required.' };
      context.log(JSON.stringify(payload));
      return { status: 401, body: JSON.stringify(payload) };
    }

    if (body.userId && body.userId !== user.id) {
      const payload = { ok: false, error: 'user_mismatch', message: 'Cannot access another learner progress.' };
      context.log(JSON.stringify(payload));
      return { status: 403, body: JSON.stringify(payload) };
    }

    const currentUser = await appwriteAdminRequest(`/users/${encodeURIComponent(user.id)}`);
    if (!currentUser.ok) {
      const payload = { ok: false, error: currentUser.error, message: currentUser.message };
      context.log(JSON.stringify(payload));
      return { status: currentUser.status || 500, body: JSON.stringify(payload) };
    }

    const currentPrefs = currentUser.data?.prefs && typeof currentUser.data.prefs === 'object' ? currentUser.data.prefs : {};
    const existingProgress = normalizeProgressBlob(currentPrefs[PROGRESS_PREFS_KEY]);

    if (action === 'get') {
      const payload = buildProgressResponse(user.id, existingProgress);
      context.log(JSON.stringify({ action, userId: user.id, totalCoursesTracked: payload.summary.totalCoursesTracked }));
      return { status: 200, body: JSON.stringify(payload) };
    }

    if (action === 'update') {
      const courseId = String(body.courseId || '').trim();
      if (!courseId) {
        const payload = { ok: false, error: 'course_id_required', message: 'courseId is required.' };
        context.log(JSON.stringify(payload));
        return { status: 400, body: JSON.stringify(payload) };
      }

      const nextRecord = sanitizeCourseRecord(courseId, body, existingProgress.courses[courseId]);
      const nextProgress = {
        version: 1,
        updatedAt: nextRecord.updatedAt,
        courses: {
          ...existingProgress.courses,
          [courseId]: nextRecord
        }
      };
      const nextPrefs = {
        ...currentPrefs,
        [PROGRESS_PREFS_KEY]: nextProgress
      };

      const update = await appwriteAdminRequest(`/users/${encodeURIComponent(user.id)}/prefs`, {
        method: 'PATCH',
        payload: { prefs: nextPrefs }
      });

      if (!update.ok) {
        const payload = { ok: false, error: update.error, message: update.message };
        context.log(JSON.stringify(payload));
        return { status: update.status || 500, body: JSON.stringify(payload) };
      }

      const payload = buildProgressResponse(user.id, nextProgress);
      context.log(JSON.stringify({ action, userId: user.id, courseId, percent: nextRecord.percent, attempts: nextRecord.attempts }));
      return { status: 200, body: JSON.stringify(payload) };
    }

    const payload = { ok: false, error: 'unsupported_action', action };
    context.log(JSON.stringify(payload));
    return { status: 400, body: JSON.stringify(payload) };
  } catch (err) {
    const payload = { ok: false, error: 'internal_error', message: err.message || 'Unknown progress error.' };
    context.error?.(err);
    context.log(JSON.stringify(payload));
    return { status: 500, body: JSON.stringify(payload) };
  }
};
