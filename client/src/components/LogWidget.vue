<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useLogStore } from "../stores/logs";

const logStore = useLogStore();

const { logs, gettingLogs, checkingOut } = storeToRefs(logStore);

const showLogs = ref(false);

const getLogs = async () => {
  if (logs.value.length === 0) {
    await logStore.getLogs();
  }
  showLogs.value = !showLogs.value;
};

const checkoutCommit = async (hash) => {
  showLogs.value = false;
  await logStore.checkoutCommit(hash);
}
</script>

<template>
  <div class="relative flex justify-center">
    <base-button
      @click="getLogs"
      buttonType="button"
      :isDisabled="gettingLogs || checkingOut"
      >Check Logs</base-button
    >
    <ul
      v-if="showLogs && !gettingLogs"
      class="absolute top-[100%] max-h-[70vh] overflow-y-scroll flex flex-col gap-2 bg-whyte p-2"
    >
      <li v-for="log in logs" :key="log?.commitHash">
        <a
          @click="checkoutCommit(log.commitHash)"
          href="#"
          class="flex flex-col items-start hover:bg-lavender p-2"
        >
          <span class="inline-flex gap-2">
            <p class="font-montserrat text-base font-semibold">
              Commit Message:
            </p>
            <p class="font-montserrat text-sm">{{ log.commitMessage }}</p>
          </span>
          <span class="inline-flex gap-2">
            <p class="font-montserrat text-base font-semibold">Commit Hash:</p>
            <p class="font-montserrat text-sm">{{ log.commitHash }}</p>
          </span>
        </a>
      </li>
    </ul>
  </div>
</template>
