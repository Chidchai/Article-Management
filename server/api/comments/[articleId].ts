export default defineEventHandler(async (event) => {
  const articleId = getRouterParam(event, 'articleId');
  const supabase = supabaseServerClient(event);

  const { data, error } = await supabase.from('comments').select('*').eq('article_id', articleId);

  return error ? { error } : data;
});
