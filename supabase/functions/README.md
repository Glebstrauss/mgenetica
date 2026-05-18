Supabase Edge Function: quizzes

This directory contains a Deno-based Edge Function for Supabase that implements the quizzes API (GET list, POST submit).

Deploy:
1. Install supabase CLI: npm i -g supabase
2. Authenticate: supabase login --token $SUPABASE_ACCESS_TOKEN
3. Link project: supabase link --project-ref $SUPABASE_PROJECT_REF
4. Deploy: supabase functions deploy quizzes --project-ref $SUPABASE_PROJECT_REF

Notes:
- The function mirrors backend /quizzes endpoints. After deploy, configure Vercel rewrites or Supabase proxy so frontend can call /api/quizzes -> edge function.
- Keep SUPABASE_ACCESS_TOKEN and SUPABASE_PROJECT_REF in GitHub secrets to enable CI deploys.
