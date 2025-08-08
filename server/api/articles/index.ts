export default defineEventHandler(async (event) => {
  const supabase = supabaseServerClient(event);

  const { data, error } = await supabase
    .from('articles')
    .select(
      `
    *,
    users:created_by(name)
  `
    )
    .order('created_at', { ascending: false });

  if (error) return { error };

  const transformed = data.map((article) => ({
    ...article,
    createByName: article.users?.name ?? '-',
  }));

  return transformed;
});
