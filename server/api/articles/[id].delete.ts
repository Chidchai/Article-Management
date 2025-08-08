export default defineEventHandler(async (event) => {
  const supabase = supabaseServerClient(event);
  const id = event.context.params?.id;

  if (!id) {
    return { error: 'Missing article ID' };
  }

  const { data, error } = await supabase.from('articles').update({ deleted_at: new Date().toISOString(), status: 'delete' }).eq('id', id).select();

  if (error) return { error };
  return { message: 'ลบสำเร็จแบบ soft delete', data };
});
