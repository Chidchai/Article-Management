<template>
  <section class="max-w-6xl mx-auto py-16 px-4 space-y-10">
    <div class="text-center">
      <h1 class="text-3xl font-bold">บทความการเงินและสินเชื่อล่าสุด</h1>
      <p class="text-muted-foreground mt-2">อัปเดตความรู้เรื่องสินเชื่อ บ้าน รถ การเงินส่วนบุคคล และอื่นๆ</p>
    </div>

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <ArticleCard v-for="article in articles" :key="article.id" :article="article" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useArticles } from "@/composables/useArticles";
import ArticleCard from "@/components/Article/ArticleCard.vue";

const articles = ref([]);
const { fetchArticles } = useArticles();

onMounted(async () => {
  //articles.value = await fetchArticles();
});
</script>
