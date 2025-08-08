export default defineEventHandler(async (event) => {
  const articleId = getRouterParam(event, 'articleId');
  const supabase = supabaseServerClient(event);

  const { data, error } = await supabase.from('seo_metadata').select('*').eq('article_id', articleId).single();

  return error ? { error } : data;
});
