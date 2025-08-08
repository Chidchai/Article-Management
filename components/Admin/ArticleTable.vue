<script setup lang="ts">
import type { ColumnDef, ColumnFiltersState } from "@tanstack/vue-table";
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useVueTable, FlexRender } from "@tanstack/vue-table";
import { h, ref } from "vue";
import { ArrowUpDown } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";

interface Article {
  id: string;
  title: string;
  status: "draft" | "published" | "delete";
  createByName: string;
  createBy: string;
}

const router = useRouter();
const articles = ref<Article[]>([]);
const { data, error } = await useFetch<Article[]>("/api/articles");

if (data.value) {
  articles.value = data.value;
} else {
  console.error("❌ โหลดบทความล้มเหลว:", error.value?.message);
}

const columns: ColumnDef<Article>[] = [
  {
    accessorKey: "title",
    header: "หัวข้อ",
    enableColumnFilter: true,
    cell: ({ row }) => h("span", row.getValue("title")),
  },
  {
    accessorKey: "status",
    header: "สถานะ",
    cell: ({ row }) => h("span", row.getValue("status")),
  },
  {
    accessorKey: "createByName",
    header: "ผู้สร้าง",
    cell: ({ row }) => h("span", row.getValue("createByName")),
  },
  // {
  //   accessorKey: "email",
  //   header: ({ column }) =>
  //     h(
  //       Button,
  //       {
  //         variant: "ghost",
  //         onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
  //       },
  //       () => ["Email", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
  //     ),
  //   cell: ({ row }) => h("span", row.getValue("email")),
  // },
  {
    id: "actions",
    header: "จัดการ",
    cell: ({ row }) =>
      h("div", { class: "flex gap-2" }, [
        h(Button, { size: "sm", variant: "outline", onClick: () => router.push(`/admin/articles/${row.original.id}`) }, "แก้ไข"),
        h(
          Button,
          {
            size: "sm",
            variant: "destructive",
            onClick: () => confirmDelete(row.original),
          },
          "ลบ"
        ),
      ]),
  },
];

const columnFilters = ref<ColumnFiltersState>([]);

const table = useVueTable({
  data: articles,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  state: {
    get columnFilters() {
      return columnFilters.value;
    },
  },
  onColumnFiltersChange: (updater) => {
    columnFilters.value = typeof updater === "function" ? updater(columnFilters.value) : updater;
  },
});

const isDeleteConfirmOpen = ref(false);
const itemToDelete = ref<Article | null>(null);

function confirmDelete(item: Article) {
  itemToDelete.value = item;
  isDeleteConfirmOpen.value = true;
}

async function deleteItem() {
  if (!itemToDelete.value) return;

  const { error } = await useFetch(`/api/articles/${itemToDelete.value.id}`, {
    method: "DELETE",
  });

  if (error.value) {
    console.error("❌ ลบล้มเหลว:", error.value.message);
  }

  isDeleteConfirmOpen.value = false;
  itemToDelete.value = null;
}
</script>
<template>
  <div class="space-y-4">
    <Input class="max-w-sm" placeholder="ค้นหาหัวข้อ..." :model-value="table.getColumn('title')?.getFilterValue() as string" @update:model-value="table.getColumn('title')?.setFilterValue($event)" />

    <div class="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <component
                :is="header.isPlaceholder ? 'span' : FlexRender"
                v-bind="{
                  render: header.column.columnDef.header,
                  props: header.getContext(),
                }"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows.length">
            <TableRow v-for="row in table.getRowModel().rows" :key="row.id">
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
              </TableCell>
            </TableRow>
          </template>
          <TableRow v-else>
            <TableCell :colspan="columns.length" class="text-center h-24">ไม่มีข้อมูล</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
    <AlertDialog v-model:open="isDeleteConfirmOpen">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>ยืนยันการลบ</AlertDialogTitle>
          <AlertDialogDescription> คุณต้องการลบบทความนี้ใช่หรือไม่? การลบจะไม่สามารถกู้คืนได้ </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel @click="isDeleteConfirmOpen = false">ยกเลิก</AlertDialogCancel>
          <AlertDialogAction @click="deleteItem">ลบ</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>
