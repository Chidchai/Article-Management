<template>
  <section class="max-w-6xl mx-auto py-16 px-4 space-y-8">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold">แดชบอร์ดผู้ดูแล</h1>
    </div>

    <div class="grid md:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>บทความทั้งหมด</CardTitle>
          <CardDescription>{{ stats.totalArticles }} รายการ</CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>ผู้ดูแลระบบ</CardTitle>
          <CardDescription>{{ stats.adminCount }} คน</CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>เพิ่มบทความใหม่</CardTitle>
          <CardDescription>
            <NuxtLink to="/admin/articles/create" class="underline">คลิกที่นี่</NuxtLink>
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
const logout = () => auth.logout();

const stats = ref({
  totalArticles: 0,
  adminCount: 0,
});

onMounted(async () => {
  // const res = await $fetch("/api/admin/stats");
  //stats.value = res;
});
</script>
