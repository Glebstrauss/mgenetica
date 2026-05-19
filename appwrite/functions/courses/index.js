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

function normalizeLocale(value) {
  const locale = String(value || '').trim().toLowerCase();
  if (locale === 'en' || locale.startsWith('en-')) return 'en';
  if (locale === 'es' || locale.startsWith('es-')) return 'es';
  return 'pt-BR';
}

const CATALOG = [
  {
    id: 1,
    slug: 'intro-genetics',
    published: true,
    copy: {
      'pt-BR': {
        title: 'Introdução à Genética',
        description: 'Fundamentos da genética para iniciantes.'
      },
      en: {
        title: 'Introduction to Genetics',
        description: 'Genetics fundamentals for learners starting the track.'
      },
      es: {
        title: 'Introducción a la Genética',
        description: 'Fundamentos de genética para quienes inician la ruta.'
      }
    }
  },
  {
    id: 2,
    slug: 'dna-sequencing',
    published: false,
    copy: {
      'pt-BR': {
        title: 'Sequenciamento de DNA',
        description: 'Conceitos e técnicas de sequenciamento.'
      },
      en: {
        title: 'DNA Sequencing',
        description: 'Core sequencing concepts and applied techniques.'
      },
      es: {
        title: 'Secuenciación de ADN',
        description: 'Conceptos clave y técnicas aplicadas de secuenciación.'
      }
    }
  }
];

module.exports = async function (context) {
  const req = context.req || {};
  const body = parseBody(req);
  const action = body.action || 'list';
  const locale = normalizeLocale(body.locale || body.lang);
  try {
    if (action === 'list') {
      const payload = CATALOG.map((course) => {
        const localized = course.copy[locale] || course.copy['pt-BR'];
        return {
          id: course.id,
          slug: course.slug,
          title: localized.title,
          description: localized.description,
          published: course.published,
          locale
        };
      });
      context.log(JSON.stringify(payload));
      return { status: 200, body: JSON.stringify(payload) };
    }
    const out = { error: 'unsupported_action', action };
    context.log(JSON.stringify(out));
    return { status: 400, body: JSON.stringify(out) };
  } catch (e) {
    console.error(e);
  }
  return { status: 500, body: JSON.stringify({ error: 'internal_error' }) };
};
