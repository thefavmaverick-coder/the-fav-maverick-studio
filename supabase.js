const SUPABASE_URL =

"https://zfuolbitipqwyevuohau.supabase.co";

const SUPABASE_KEY =

"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmdW9sYml0aXBxd3lldnVvaGF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzMDEyNjgsImV4cCI6MjA5NDg3NzI2OH0.aypqSYekimxM_g73U0GxpSB7uBvfaOYbaQVjvryxfMUYOUR_ANON_KEY";

const supabaseClient =

supabase.createClient(

SUPABASE_URL,

SUPABASE_KEY

);