import { ref } from "vue";
import axios from "../utils/axios";
import { defineStore } from "pinia";
import { useStagesStore } from "./stages";

export const useLogStore = defineStore("logs", () => {
  const logs = ref([]);
  const gettingLogs = ref(false);
  const checkingOut = ref(false);
  const stageStore = useStagesStore();

  const getLogs = async () => {
    gettingLogs.value = true;
    try {
      const { data } = await axios.get("/gitLog");
      logs.value = data.logs;
      gettingLogs.value = false;
    } catch (err) {
      console.error(err);
    }
  };

  const checkoutCommit = async (hash) => {
    checkingOut.value = true;
    try {
      const response = await axios.post("/gitCheckout", { commitHash: hash });
      if (response.status === 200) {
        await stageStore.getStages();
        checkingOut.value = false;
      }
    } catch (err) {
      console.error(err);
    }
  };

  return { getLogs, logs, gettingLogs, checkoutCommit, checkingOut };
});
