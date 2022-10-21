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
    <transition name="drop-in">
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
              <p class="font-montserrat text-base font-semibold">
                Commit Hash:
              </p>
              <p class="font-montserrat text-sm">{{ log.commitHash }}</p>
            </span>
          </a>
        </li>
      </ul>
    </transition>
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
