<script setup>
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useStagesStore } from "../stores/stages";

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
  contentKey: {
    type: String,
    required: true,
  },
  stageName: {
    type: String,
    required: true,
  },
});

const textValue = ref(props.content);

watch(
  () => props.content,
  (newValue) => {
    textValue.value = newValue;
  }
);

const stagesStore = useStagesStore();
const { updatingCell } = storeToRefs(stagesStore);
const commitChange = () => {
  stagesStore.updateCell({
    name: props.contentKey,
    stageName: props.stageName,
    content: JSON.parse(textValue.value),
  });
};
</script>

<template>
  <form @submit.prevent="commitChange" class="w-full">
    <textarea
      name="cellContent"
      id=""
      rows="10"
      class="w-full"
      v-model="textValue"
    ></textarea>
    <base-button buttonType="submit" :isDisabled="updatingCell"
      >Commit</base-button
    >
  </form>
</template>
