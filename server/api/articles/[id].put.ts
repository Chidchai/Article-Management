export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const body = await readBody(event);
  const supabase = supabaseServerClient(event);

  const { data, error } = await supabase.from('articles').update(body).eq('id', id).select();
  return error ? { error } : data;
});
