<script setup lang="ts">
const props = defineProps({
  image: {
    type: String,
    default: '',
  },
  video: {
    type: String,
    default: '',
  },
  caption: {
    type: String,
    default: '',
  },
  loop: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <div class="slidev-layout cc-image">
    <slot />
    <div class="cc-image-panel">
      <video v-if="props.video" :src="props.video" autoplay muted :loop="props.loop" playsinline />
      <img v-else :src="props.image" :alt="props.caption" />
      <div v-if="props.caption" class="cc-image-caption">{{ props.caption }}</div>
    </div>
  </div>
</template>
