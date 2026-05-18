module.exports = async function (req) {
  // Appwrite Node runtime (node-22) may prefer single-arg handlers that return the payload
  return [
    { id: 1, slug: 'intro-genetics', title: 'Introdução à Genética', description: 'Fundamentos da genética para iniciantes', published: true },
    { id: 2, slug: 'dna-sequencing', title: 'Sequenciamento de DNA', description: 'Conceitos e técnicas de sequenciamento', published: false }
  ];
};
