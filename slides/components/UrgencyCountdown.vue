<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const DURATION_SECONDS = 2 * 60
const remainingSeconds = ref(DURATION_SECONDS)

let deadline = 0
let timer: ReturnType<typeof setInterval> | undefined
let observer: IntersectionObserver | undefined

const formattedTime = computed(() => {
  const minutes = Math.floor(remainingSeconds.value / 60)
  const seconds = remainingSeconds.value % 60

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
})

function stopCountdown() {
  if (timer) clearInterval(timer)
  timer = undefined
}

function updateCountdown() {
  remainingSeconds.value = Math.max(0, Math.ceil((deadline - Date.now()) / 1000))
  if (remainingSeconds.value === 0) stopCountdown()
}

function startCountdown() {
  stopCountdown()
  remainingSeconds.value = DURATION_SECONDS
  deadline = Date.now() + DURATION_SECONDS * 1000
  timer = setInterval(updateCountdown, 250)
}

const root = ref<HTMLElement>()

onMounted(() => {
  observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) startCountdown()
    else stopCountdown()
  }, { threshold: 0.6 })

  if (root.value) observer.observe(root.value)
})

onBeforeUnmount(() => {
  stopCountdown()
  observer?.disconnect()
})
</script>

<template>
  <div ref="root" class="cc-urgency" role="timer" aria-live="off">
    <div class="cc-urgency-stock">
      <span aria-hidden="true"></span>
      ÚLTIMAS 3 VAGAS
    </div>
    <p>Só dá para comprar nos próximos</p>
    <strong>{{ formattedTime }}</strong>
    <small>Depois disso, o preço aumenta. Confia.</small>
  </div>
</template>
