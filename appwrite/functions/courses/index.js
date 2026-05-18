// Appwrite Function: courses
// Returns list of courses (could fetch from Appwrite Databases in production)

module.exports = async function (req, res) {
  try {
    return res.json([
      { id: 1, slug: 'intro-genetics', title: 'Introdução à Genética', description: 'Fundamentos da genética para iniciantes', published: true },
      { id: 2, slug: 'dna-sequencing', title: 'Sequenciamento de DNA', description: 'Conceitos e técnicas de sequenciamento', published: false }
    ]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'internal_error' });
  }
};
