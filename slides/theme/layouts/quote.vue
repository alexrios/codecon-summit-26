<script setup lang="ts">
const props = defineProps({
  meta: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="slidev-layout cc-quote">
    <div class="cc-quote-body">
      <slot />
      <div v-if="props.meta" class="cc-quote-meta">{{ props.meta }}</div>
    </div>
  </div>
</template>
