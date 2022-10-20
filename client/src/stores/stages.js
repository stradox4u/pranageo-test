import { ref } from "vue";
import axios from "../utils/axios";
import { defineStore } from "pinia";

export const useStagesStore = defineStore("stages", () => {
  const projectName = ref("");
  const stages = ref({});

  const getStages = async () => {
    try {
      const { data } = await axios.get("/stages");
      projectName.value = data.projectName;

      // Parse json
      Object.keys(data.stages).forEach((stage) => {
        stages.value[stage] = data.stages[stage]["content"];
        Object.keys(stages.value[stage]).forEach((cellKey) => {
          stages.value[stage][cellKey] = JSON.parse(
            stages.value[stage][cellKey]
          );
        });
      });
    } catch (err) {
      console.error(err);
    }
  };

  const updateCell = async ({ name, stageName, content }) => {
    try {
      const response = await axios.patch("/cell", { name, stageName, content });
      stages.value[stageName][name] = content;
    } catch (err) {
      console.error(err);
    }
  };

  return { projectName, stages, getStages, updateCell };
});
