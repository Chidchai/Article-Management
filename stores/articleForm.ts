// stores/articleForm.ts
import { defineStore } from 'pinia';

const user = useSupabaseUser();
const uid = user.value?.id || '';

export const useArticleFormStore = defineStore('articleForm', {
  state: () => ({
    title: '',
    content: '',
    categories: [] as string[],
    tags: [] as string[],
    coverImage: '',
    status: 'draft',
    metaTitle: '',
    metaDescription: '',
    focusKeyphrase: '',
    created_by: '',
  }),

  persist: true,

  actions: {
    clearForm() {
      this.$reset();
    },

    async saveDraftToServer() {
      try {
        await $fetch('/api/articles/create', {
          method: 'POST',
          body: { ...this.$state, status: 'draft', created_by: uid },
          credentials: 'include',
        });
      } catch (err) {
        console.error('❌ บันทึกแบบร่างล้มเหลว:', err);
      }
    },

    async submit() {
      try {
        const { data, error } = await useFetch('/api/articles/create', {
          method: 'POST',
          body: { ...this.$state, status: 'published', created_by: uid },
          credentials: 'include',
        });

        if (error.value) throw new Error(error.value.message);

        this.clearForm();
        return true;
      } catch (err) {
        console.error('❌ เผยแพร่ล้มเหลว:', err);
        return false;
      }
    },
  },
});
