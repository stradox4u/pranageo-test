<script setup>
const props = defineProps({
  buttonType: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <button
    :type="buttonType"
    class="w-full py-3 my-3 bg-maroon text-whyte rounded-md shadow-md"
  >
    <slot></slot>
  </button>
</template>
