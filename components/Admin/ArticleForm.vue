<template>
  <div class="pt-4 flex justify-end">
    <Button variant="secondary" @click="router.back()">ย้อนกลับ</Button>
  </div>
  <form class="grid grid-cols-1 lg:grid-cols-3 gap-6" @submit.prevent="onSubmit">
    <div class="lg:col-span-2 space-y-6">
      <div class="space-y-2">
        <Label for="title">หัวข้อบทความ</Label>
        <Input id="title" v-model="form.title" placeholder="หัวข้อบทความ" required />
      </div>

      <div class="space-y-2">
        <Label for="content">เนื้อหา</Label>
        <RichTextEditor id="content" v-model="form.content" />
      </div>
      <div class="rounded-md border p-4 space-y-3">
        <Label>Focus Keyphrase</Label>
        <Input v-model="form.focusKeyphrase" placeholder="Focus keyphrase" />
        <Label>SEO Title</Label>
        <Input v-model="form.metaTitle" placeholder="SEO Title" />
        <Label>Meta Description</Label>
        <Textarea v-model="form.metaDescription" placeholder="Meta Description" rows="3" />
      </div>
    </div>

    <div class="space-y-6">
      <div class="space-y-2">
        <Label for="title"></Label>
      </div>
      <div class="rounded-md border p-4 space-y-3">
        <Label>เผยแพร่</Label>
        <Select v-model="form.status">
          <SelectTrigger class="w-full">
            <SelectValue placeholder="เลือกสถานะ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">ฉบับร่าง</SelectItem>
            <SelectItem value="published">เผยแพร่</SelectItem>
          </SelectContent>
        </Select>
        <div class="flex gap-2 justify-end">
          <Button type="button" variant="outline" @click="saveDraft">บันทึกฉบับร่าง</Button>
          <Button type="submit">เผยแพร่</Button>
        </div>
      </div>

      <div class="rounded-md border p-4 space-y-2">
        <Label for="categories">หมวดหมู่</Label>
        <TagsInput id="categories" v-model="form.categories" class="w-full">
          <TagsInputItem v-for="category in form.categories" :key="category" :value="category">
            <TagsInputItemText />
            <TagsInputItemDelete />
          </TagsInputItem>
          <TagsInputInput placeholder="เลือกหมวดหมู่" />
        </TagsInput>
      </div>

      <div class="rounded-md border p-4 space-y-2">
        <Label for="tags">แท็ก</Label>
        <TagsInput id="tags" v-model="form.tags" class="w-full">
          <TagsInputItem v-for="tag in form.tags" :key="tag" :value="tag">
            <TagsInputItemText />
            <TagsInputItemDelete />
          </TagsInputItem>
          <TagsInputInput placeholder="แท็กที่เกี่ยวข้อง" />
        </TagsInput>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { debounce } from "lodash-es";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { TagsInput, TagsInputItem, TagsInputItemText, TagsInputItemDelete, TagsInputInput } from "@/components/ui/tags-input";

import RichTextEditor from "@/components/Article/RichTextEditor.vue";

const router = useRouter();

const form = ref({
  title: "",
  content: "",
  categories: [],
  tags: [],
  coverImage: "",
  status: "draft",
  metaTitle: "",
  metaDescription: "",
  focusKeyphrase: "",
});

const saveDraft = debounce(() => {
  localStorage.setItem("article-draft", JSON.stringify(form.value));
}, 2000);

watch(form, () => saveDraft(), { deep: true });

onMounted(() => {
  const saved = localStorage.getItem("article-draft");
  if (saved) form.value = JSON.parse(saved);
});

const onSubmit = async () => {
  console.log("Form data:", form.value);
  localStorage.removeItem("article-draft");
  router.push("/admin/dashboard");
};
</script>
