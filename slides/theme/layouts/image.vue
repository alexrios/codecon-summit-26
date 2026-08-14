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

// Frontmatter paths bypass Slidev's base rewriting, so absolute paths break
// when the deck is served under a subpath (e.g. /codecon-summit-26/).
const withBase = (p: string) => p.startsWith('/') ? import.meta.env.BASE_URL + p.slice(1) : p
</script>

<template>
  <div class="slidev-layout cc-image">
    <slot />
    <div class="cc-image-panel">
      <video v-if="props.video" :src="withBase(props.video)" autoplay muted :loop="props.loop" playsinline />
      <img v-else :src="withBase(props.image)" :alt="props.caption" />
      <div v-if="props.caption" class="cc-image-caption">{{ props.caption }}</div>
    </div>
  </div>
</template>
