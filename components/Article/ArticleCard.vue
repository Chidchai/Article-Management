<template>
  <Card>
    <NuxtLink :to="`/blog/${article.slug}`">
      <img :src="article.cover || '/default.jpg'" class="rounded-t-lg w-full h-48 object-cover" alt="cover" />
    </NuxtLink>
    <div class="p-4 space-y-2">
      <h2 class="text-lg font-semibold">
        <NuxtLink :to="`/blog/${article.slug}`">
          {{ article.title }}
        </NuxtLink>
      </h2>
      <p class="text-sm text-muted-foreground">
        {{ article.excerpt }}
      </p>
      <NuxtLink :to="`/blog/${article.slug}`">
        <Button variant="link" size="sm">อ่านต่อ →</Button>
      </NuxtLink>
    </div>
  </Card>
</template>

<script setup lang="ts">
defineProps<{
  article: {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    cover?: string;
  };
}>();
</script>
