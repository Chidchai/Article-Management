<template>
  <section class="max-w-4xl mx-auto py-10 px-4">
    <h1 class="text-2xl font-bold mb-6">แก้ไขบทความ</h1>
    <ArticleForm :initial-data="article" />
  </section>
</template>

<script setup lang="ts">
import ArticleForm from "@/components/Admin/ArticleForm.vue";
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";

const route = useRoute();
const article = ref(null);

onMounted(async () => {
  // const id = route.params.id;
  // const res = await $fetch(`/api/articles/${id}`);
  //article.value = res;
});
</script>
