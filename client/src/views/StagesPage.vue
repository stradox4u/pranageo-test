<script setup>
import { computed, onMounted, ref } from "vue";
import { useStagesStore } from "../stores/stages";
import { storeToRefs } from "pinia";

import CellInput from "../components/CellInput.vue";

const stagesStore = useStagesStore();

onMounted(async () => {
  await stagesStore.getStages();
});

const { stages, projectName } = storeToRefs(stagesStore);

const currentStage = ref(null);

const setCurrentStage = (index) => {
  currentStage.value = index;
};

const sortedCells = computed(() => {
  if (currentStage.value) {
    return Object.keys(stages.value[currentStage.value]).sort((a, b) => {
      return (
        +a.replace(".json", "").replace("cell", "") -
        +b.replace(".json", "").replace("cell", "")
      );
    });
  } else {
    return null;
  }
});
</script>

<template>
  <div class="p-4">
    <h2 class="font-nunito text-xl font-semibold text-center">
      ProjectName:&nbsp;{{ projectName }}
    </h2>
    <h3 class="font-nunito text-lg font-semibold mb-3">Stages:</h3>
    <div v-for="(stage, index) in stages" :key="index">
      <a
        class="inline-flex gap-2 p-3 bg-lavender rounded-md shadow-md mb-3"
        href="#"
        @click="setCurrentStage(index)"
      >
        <h4>{{ index }}</h4>
      </a>
      <ul v-if="currentStage === index" class="grid grid-cols-2 gap-3">
        <li
          v-for="(cell, cellIndex) in sortedCells"
          :key="cellIndex"
          class="w-full bg-whyte p-2 rounded-md shadow-md"
        >
          <h5 class="font-montserrat text-lg font-semibold my-2">
            {{ cell.replace(".json", "") }}:
          </h5>
          <cell-input
            :content="stages[index][cell]"
            :contentKey="cell"
            :stageName="index"
          ></cell-input>
        </li>
      </ul>
    </div>
  </div>
</template>
