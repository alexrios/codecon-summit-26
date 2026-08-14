<template>
  <div class="slidev-layout cc-cover">
    <div class="cc-topbar">
      <span class="cc-topbar-brand">Codecon Summit 26</span>
      <span>14–15 ago · Curitiba</span>
    </div>
    <svg class="cc-cover-diagram" viewBox="0 0 520 420" fill="none" aria-hidden="true">
      <rect x="20" y="170" width="130" height="80" rx="10" stroke="#0099ff" stroke-width="2" />
      <rect x="230" y="60" width="130" height="80" rx="10" stroke="#ffcc21" stroke-width="2" />
      <rect x="230" y="280" width="130" height="80" rx="10" stroke="#e73288" stroke-width="2" />
      <rect x="420" y="170" width="80" height="80" rx="40" stroke="#acf986" stroke-width="2" />
      <path d="M150 200 C 190 200 190 100 230 100" stroke="#f0eeeb" stroke-width="1.5" stroke-dasharray="6 6" opacity="0.7" />
      <path d="M150 220 C 190 220 190 320 230 320" stroke="#f0eeeb" stroke-width="1.5" stroke-dasharray="6 6" opacity="0.7" />
      <path d="M360 100 C 400 100 400 190 418 200" stroke="#f0eeeb" stroke-width="1.5" stroke-dasharray="6 6" opacity="0.7" />
      <path d="M360 320 C 400 320 400 230 418 220" stroke="#f0eeeb" stroke-width="1.5" stroke-dasharray="6 6" opacity="0.7" />
      <circle cx="230" cy="100" r="4" fill="#f0eeeb" opacity="0.8" />
      <circle cx="230" cy="320" r="4" fill="#f0eeeb" opacity="0.8" />
      <circle cx="418" cy="200" r="4" fill="#f0eeeb" opacity="0.8" />
      <circle cx="418" cy="220" r="4" fill="#f0eeeb" opacity="0.8" />
    </svg>
    <div class="cc-cover-body">
      <slot />
    </div>
  </div>
</template>
