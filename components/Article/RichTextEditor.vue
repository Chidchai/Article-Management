<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";

import { Bold, Italic, Strikethrough, Code, Undo, Redo, List, ListOrdered, Quote, Heading1, Heading2, Heading3, Pilcrow } from "lucide-vue-next";

import { Button } from "@/components/ui/button";

const props = defineProps<{ modelValue: string }>();
const emit = defineEmits(["update:modelValue"]);

const editor = ref<Editor>();

onMounted(() => {
  editor.value = new Editor({
    content: props.modelValue,
    extensions: [StarterKit.configure({ heading: false }), Heading.configure({ levels: [1, 2, 3] }), Underline],
    editorProps: {
      attributes: {
        class: "prose max-w-none focus:outline-none min-h-[200px]",
      },
    },
    onUpdate: ({ editor }) => {
      emit("update:modelValue", editor.getHTML());
    },
  });
});

watch(
  () => props.modelValue,
  (value) => {
    if (editor.value && editor.value.getHTML() !== value) {
      editor.value.commands.setContent(value);
    }
  }
);

const isActive = (name: string, options?: any) => {
  return editor.value?.isActive(name, options);
};

const exec = (command: () => void) => {
  editor.value?.chain().focus();
  command();
};
</script>

<template>
  <div class="rounded-md border bg-white">
    <div class="flex flex-wrap gap-2 p-3 border-b bg-gray-50">
      <Button
        variant="ghost"
        size="icon"
        :class="{ 'bg-blue-100 text-blue-700': isActive('bold') }"
        @click="exec(() => editor?.chain().toggleBold().run())"
      >
        <Bold class="w-4 h-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        :class="{ 'bg-blue-100 text-blue-700': isActive('italic') }"
        @click="exec(() => editor?.chain().toggleItalic().run())"
      >
        <Italic class="w-4 h-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        :class="{ 'bg-blue-100 text-blue-700': isActive('strike') }"
        @click="exec(() => editor?.chain().toggleStrike().run())"
      >
        <Strikethrough class="w-4 h-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        :class="{ 'bg-blue-100 text-blue-700': isActive('underline') }"
        @click="exec(() => editor?.chain().toggleUnderline().run())"
      >
        <Pilcrow class="w-4 h-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        :class="{ 'bg-blue-100 text-blue-700': isActive('heading', { level: 1 }) }"
        @click="exec(() => editor?.chain().toggleHeading({ level: 1 }).run())"
      >
        <Heading1 class="w-4 h-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        :class="{ 'bg-blue-100 text-blue-700': isActive('heading', { level: 2 }) }"
        @click="exec(() => editor?.chain().toggleHeading({ level: 2 }).run())"
      >
        <Heading2 class="w-4 h-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        :class="{ 'bg-blue-100 text-blue-700': isActive('heading', { level: 3 }) }"
        @click="exec(() => editor?.chain().toggleHeading({ level: 3 }).run())"
      >
        <Heading3 class="w-4 h-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        :class="{ 'bg-blue-100 text-blue-700': isActive('bulletList') }"
        @click="exec(() => editor?.chain().toggleBulletList().run())"
      >
        <List class="w-4 h-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        :class="{ 'bg-blue-100 text-blue-700': isActive('orderedList') }"
        @click="exec(() => editor?.chain().toggleOrderedList().run())"
      >
        <ListOrdered class="w-4 h-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        :class="{ 'bg-blue-100 text-blue-700': isActive('blockquote') }"
        @click="exec(() => editor?.chain().toggleBlockquote().run())"
      >
        <Quote class="w-4 h-4" />
      </Button>

      <Button variant="ghost" size="icon" @click="exec(() => editor?.chain().undo().run())">
        <Undo class="w-4 h-4" />
      </Button>

      <Button variant="ghost" size="icon" @click="exec(() => editor?.chain().redo().run())">
        <Redo class="w-4 h-4" />
      </Button>
    </div>

    <EditorContent :editor="editor" class="p-4" />
  </div>
</template>
