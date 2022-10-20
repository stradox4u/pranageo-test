<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="w-full bg-gold h-[36px] px-8 py-1">
    <RouterLink :to="{ name: 'stages' }">
      <h1 class="font-montserrat font-bold text-xl">PRANAGEO Test</h1>
    </RouterLink>
  </div>
</template>
