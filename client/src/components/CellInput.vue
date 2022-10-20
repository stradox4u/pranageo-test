<script setup>
import { ref } from "vue";
import { useStagesStore } from "../stores/stages";

const props = defineProps({
  content: {
    type: Object,
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
const textValue = ref(JSON.stringify(props.content));

const { updateCell } = useStagesStore();
const commitChange = () => {
  updateCell({
    name: props.contentKey,
    stageName: props.stageName,
    content: textValue.value,
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
    <base-button buttonType="submit">Commit</base-button>
  </form>
</template>
