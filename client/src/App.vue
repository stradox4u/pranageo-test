<script setup>
import { RouterLink, RouterView } from "vue-router";
import MyHeader from "./components/MyHeader.vue";
</script>

<template>
  <div class="w-full">
    <my-header></my-header>

  <RouterView />
  </div>
</template>
