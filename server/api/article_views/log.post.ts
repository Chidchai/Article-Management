export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const supabase = supabaseServerClient(event);

  const { data, error } = await supabase.from('article_views').insert([body]);
  return error ? { error } : data;
});
