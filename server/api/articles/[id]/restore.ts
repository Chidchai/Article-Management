export default defineEventHandler(async (event) => {
  const supabase = supabaseServerClient(event);
  const id = event.context.params?.id;

  const { error } = await supabase.from('articles').update({ deleted_at: null }).eq('id', id);

  return error ? { error } : { message: 'เรียกคืนสำเร็จ' };
});
