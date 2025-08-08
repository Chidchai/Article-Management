<template>
  <section class="max-w-4xl mx-auto py-10 px-4">
    <h1 class="text-2xl font-bold mb-6">แก้ไขบทความ</h1>
    <ArticleForm v-if="article" :initial-data="article" />
  </section>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import ArticleForm from "@/components/Admin/ArticleForm.vue";
import type { articleForm } from "~/types/article";

const route = useRoute();
const article = ref<articleForm | null>(null);

onMounted(async () => {
  try {
    const { data, error } = await useFetch<articleForm>(`/api/articles/${route.params.id}`);
    if (error.value) throw new Error(error.value.message);
    article.value = data.value;
  } catch (err) {
    console.error("โหลดบทความล้มเหลว:", err);
  }
});
</script>
