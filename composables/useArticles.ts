import type { Article } from '~/types/article';

export function useArticles() {
  const fetchArticles = async () => {
    const { data } = await useFetch<Article[]>('/api/articles');
    return data.value || [];
  };

  const getArticleBySlug = async (slug: string) => {
    const { data } = await useFetch(`/api/articles/${slug}`);
    return data.value || null;
  };

  return {
    fetchArticles,
    getArticleBySlug,
  };
}
