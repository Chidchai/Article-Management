export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const supabase = supabaseServerClient(event);

  const { data, error } = await supabase.from('articles').select('*').eq('id', id).single();

  return error ? { error } : data;
});
