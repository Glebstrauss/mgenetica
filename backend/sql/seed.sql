-- Seed sample courses
INSERT INTO courses (slug, title, description, published) VALUES
('intro-genetics', 'Introdução à Genética', 'Fundamentos da genética para iniciantes', true),
('dna-sequencing', 'Sequenciamento de DNA', 'Conceitos e técnicas de sequenciamento', false)
ON CONFLICT (slug) DO NOTHING;
