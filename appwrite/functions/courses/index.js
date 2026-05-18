module.exports = async function (req) {
  const payload = [
    { id: 1, slug: 'intro-genetics', title: 'Introdução à Genética', description: 'Fundamentos da genética para iniciantes', published: true },
    { id: 2, slug: 'dna-sequencing', title: 'Sequenciamento de DNA', description: 'Conceitos e técnicas de sequenciamento', published: false }
  ];
  // Ensure Appwrite runtime captures the output
  try {
    console.log(JSON.stringify(payload));
  } catch (e) {
    console.error(e);
  }
  return;
};
