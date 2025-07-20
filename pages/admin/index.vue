<template>
  <section class="max-w-6xl mx-auto py-10 px-4 space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">บทความทั้งหมด</h1>
      <NuxtLink to="/admin/articles/create">
        <Button>➕ เพิ่มบทความ</Button>
      </NuxtLink>
    </div>

    <ArticleTable />
  </section>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import ArticleTable from "@/components/Admin/ArticleTable.vue";
</script>
