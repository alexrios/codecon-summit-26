<script setup lang="ts">
const props = defineProps({
  color: {
    type: String,
    default: 'yellow',
  },
  index: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="slidev-layout cc-section" :class="`cc-bg-${props.color}`">
    <div class="cc-topbar">
      <span class="cc-topbar-brand">Codecon Summit 26</span>
      <span>Além do diagrama de caixinhas</span>
    </div>
    <slot />
  </div>
</template>
