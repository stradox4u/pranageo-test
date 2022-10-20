<script setup>
import { onMounted, computed } from "vue";
import { useStagesStore } from "../stores/stages";
import { storeToRefs } from "pinia";

const stagesStore = useStagesStore();

onMounted(async () => {
  await stagesStore.getStages();
});

const { stages, projectName } = storeToRefs(stagesStore);
</script>

<template>

  <h2>ProjectName:&nbsp;{{ projectName }}</h2>
  <!-- <div>{{ stages }}</div> -->
  <ul>
    <li v-for="(stageName, index) in stages" :key="index">
      {{ index }}
      <ul>
        <li v-for="(cell, cellIndex) in stages[index]" :key="cell">
          {{ cellIndex }}
        </li>
      </ul>
    </li>
  </ul>
</template>