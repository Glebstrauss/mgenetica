import { serve } from "https://deno.land/std@0.201.0/http/server.ts";

serve(async (req) => {
  try {
    if (req.method === 'POST') {
      const body = await req.json();
      const { quizId, answers } = body || {};
      if (!quizId || !Array.isArray(answers)) return new Response(JSON.stringify({ error: 'quizId and answers required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
      const score = answers.reduce((s, a) => s + (a === true ? 1 : 0), 0);
      return new Response(JSON.stringify({ quizId, score, total: answers.length }), { headers: { 'Content-Type': 'application/json' } });
    }
    // GET: list quizzes (simple)
    return new Response(JSON.stringify([{ id: 1, course_id: 1, title: 'Quiz: Introdução', questions: 3 }]), { headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'internal_error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
});
