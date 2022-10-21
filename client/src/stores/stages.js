import { ref } from "vue";
import axios from "../utils/axios";
import { defineStore } from "pinia";

export const useStagesStore = defineStore("stages", () => {
  const projectName = ref("");
  const stages = ref({});
  const updatingCell = ref(false);
  const pullingRepo = ref(false);

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
    updatingCell.value = true;
    try {
      await axios.patch("/cell", { name, stageName, content });
      stages.value[stageName][name] = content;
      updatingCell.value = false;
    } catch (err) {
      console.error(err);
      updatingCell.value = false;
    }
  };

  const pullRepo = async () => {
    pullingRepo.value = true;
    try {
      const { data } = await axios.post("/gitPull", {
        projectName: projectName.value,
      });
      const updatedFiles = data.updatedFiles;
      Object.keys(updatedFiles).forEach((updatedFile) => {
        const fileKey = updatedFile.split("/")[1];
        stages.value[updatedFile.split("/")[0]][fileKey] = JSON.parse(
          data.updatedFiles[updatedFile]
        );
      });
      pullingRepo.value = false;
    } catch (err) {
      console.error(err);
      pullingRepo.value = false;
    }
  };

  return {
    projectName,
    stages,
    getStages,
    updateCell,
    pullRepo,
    updatingCell,
    pullingRepo,
  };
});
