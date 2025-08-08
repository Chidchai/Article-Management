export default defineEventHandler(async (event) => {
  const supabase = supabaseServerClient(event);
  const { data, error } = await supabase.from('tags').select('*');
  return error ? { error } : data;
});
