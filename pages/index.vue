<template>
  <section class="w-full py-16">
    <div class="max-w-6xl mx-auto px-4 text-center space-y-12">
      <div>
        <h1 class="text-4xl font-bold tracking-tight">บทความวิเคราะห์การเงินและสินเชื่อ อ่านง่าย ใช้ได้จริง</h1>
        <p class="text-muted-foreground mt-4 max-w-2xl mx-auto">
          คลังบทความความรู้เกี่ยวกับสินเชื่อบ้าน รถ วางแผนหนี้ และการเงินส่วนบุคคล พร้อมกราฟและตารางประกอบ เข้าใจง่ายในไม่กี่นาที
        </p>
        <div class="mt-6">
          <NuxtLink to="/blog">
            <Button size="lg">เริ่มอ่านบทความ</Button>
          </NuxtLink>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>สรุปเนื้อหาเข้าใจง่าย</CardTitle>
            <CardDescription> ทุกบทความถูกเขียนโดยใช้ภาษาที่เข้าถึงได้ พร้อมสรุปจุดสำคัญให้อ่านรวดเร็ว </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>มีตารางและกราฟช่วยวิเคราะห์</CardTitle>
            <CardDescription> บทความที่ซับซ้อนจะมีแผนภาพ เช่น Pie, Line และ Bar Charts เพื่อช่วยเข้าใจ </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ค้นหาและกรองหมวดหมู่ได้</CardTitle>
            <CardDescription> เลือกดูเฉพาะบทความสินเชื่อบ้าน รถ การเงินส่วนบุคคล หรือบทความยอดนิยม </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
</script>
