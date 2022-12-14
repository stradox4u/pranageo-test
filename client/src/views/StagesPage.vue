<script setup>
import { computed, onMounted, ref } from "vue";
import { useStagesStore } from "../stores/stages";
import { storeToRefs } from "pinia";

import CellInput from "../components/CellInput.vue";
import LogWidget from "../components/LogWidget.vue";

const stagesStore = useStagesStore();

onMounted(async () => {
  await stagesStore.getStages();
});

const { stages, projectName, pullingRepo } = storeToRefs(stagesStore);

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

const pullRepo = async () => {
  await stagesStore.pullRepo();
};
</script>

<template>
  <div class="p-4">
    <div class="w-full flex flex-row justify-between items-center">
      <h2 class="font-bebas text-3xl font-semibold">
        ProjectName:&nbsp;{{ projectName }}
      </h2>
      <div class="w-[20%]">
        <base-button
          @click="pullRepo"
          buttonType="button"
          :isDisabled="pullingRepo"
          >Pull</base-button
        >
      </div>
    </div>
    <div class="w-full">
      <log-widget></log-widget>
    </div>
    <h3 class="font-nunito text-lg font-semibold mb-3">Stages:</h3>
    <div v-for="(stage, index) in stages" :key="index">
      <a
        class="inline-flex gap-2 p-3 bg-lavender rounded-md shadow-md mb-3"
        href="#"
        @click="setCurrentStage(index)"
      >
        <h4>{{ index }}</h4>
      </a>
      <transition name="drop-in">
        <ul v-if="currentStage === index" class="grid grid-cols-2 gap-3">
          <li
            v-for="(cell, cellIndex) in sortedCells"
            :key="cellIndex"
            class="w-full bg-whyte p-2 rounded-md shadow-md">
            <h5 class="font-montserrat text-lg font-semibold my-2">
              {{ cell.replace(".json", "") }}:
            </h5>
            <cell-input
              :content="JSON.stringify(stages[index][cell])"
              :contentKey="cell"
              :stageName="index"
            >
            </cell-input>
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.drop-in-enter-from,
.drop-in-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.drop-in-enter-active,
.drop-in-leave-active {
  transition: all 0.4s ease-in-out;
}

.drop-in-enter-to,
.drop-in-leave-from {
  transform: translateY(0px);
  opacity: 1;
}
</style>
