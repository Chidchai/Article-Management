<template>
  <section class="max-w-3xl mx-auto py-16 px-4 space-y-6">
    <div class="space-y-2">
      <h1 class="text-3xl font-bold">{{ article?.title }}</h1>
      <p class="text-sm text-muted-foreground">{{ formatDate(article?.published_at) }} · อ่าน {{ readingTime(article?.content) }} นาที</p>
    </div>

    <div v-html="article?.content" class="prose max-w-none" />

    <div class="pt-8">
      <NuxtLink to="/blog">
        <Button variant="outline">← กลับไปหน้าบทความ</Button>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useArticles } from "@/composables/useArticles";
import { readingTime } from "@/utils/readingTime";

const route = useRoute();
const { getArticleBySlug } = useArticles();

const article = ref<any>(null);

onMounted(async () => {
  const slug = route.params.slug as string;
  // article.value = await getArticleBySlug(slug);
});

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
</script>

<style scoped>
.prose :deep(img) {
  max-width: 100%;
  border-radius: 0.5rem;
}
</style>
