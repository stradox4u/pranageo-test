<script setup>
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
    class="w-full py-3 my-3 bg-maroon text-whyte rounded-md shadow-md disabled:bg-darkMaroon"
    :disabled="isDisabled"
  >
    <slot></slot>
  </button>
</template>
