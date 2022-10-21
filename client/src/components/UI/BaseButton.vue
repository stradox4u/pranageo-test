<script setup>
import spinner from "../../assets/spinner.png";
const props = defineProps({
  buttonType: {
    type: String,
    required: true,
  },
  isDisabled: {
    type: Boolean,
    required: false,
  },
});
</script>

<template>
  <button
    :type="buttonType"
    class="w-full py-3 my-3 bg-maroon text-whyte rounded-md shadow-md disabled:bg-darkMaroon disabled:bg-opacity-70"
    :disabled="isDisabled"
  >
    <div v-if="!isDisabled">
      <slot></slot>
    </div>
    <div v-else>
      <img :src="spinner" class="h-4 mx-auto animate-spin" />
    </div>
  </button>
</template>
