<template>
  <div class="slidev-layout cc-cover-3d">
    <div class="cc-topbar">
      <span class="cc-topbar-brand">Codecon Summit 26</span>
      <span>14–15 ago · Curitiba</span>
    </div>

    <div class="cc-cover-3d-copy">
      <slot />
    </div>

    <div class="cc3-visual" aria-hidden="true">
      <span class="cc3-orbit cc3-orbit-one"></span>
      <span class="cc3-orbit cc3-orbit-two"></span>
      <div class="cc3-scene">
        <div class="cc3-platform">
          <svg class="cc3-links" viewBox="0 0 520 390" fill="none">
            <path d="M78 194 C125 194 147 119 213 104" />
            <path d="M78 194 C132 194 153 277 235 285" />
            <path d="M266 104 C319 93 349 69 397 64" />
            <path d="M269 113 C330 132 344 187 401 196" />
            <path d="M276 281 C330 267 346 221 402 207" />
          </svg>

          <div class="cc3-node cc3-node-gateway" style="--node: var(--cc-blue); --delay: 0s">
            <span class="cc3-face cc3-face-front"><b>gateway</b><small>HTTP / 01</small></span>
            <span class="cc3-face cc3-face-top"></span><span class="cc3-face cc3-face-side"></span>
          </div>
          <div class="cc3-node cc3-node-checkout" style="--node: var(--cc-yellow); --delay: .18s">
            <span class="cc3-face cc3-face-front"><b>checkout</b><small>CORE / 02</small></span>
            <span class="cc3-face cc3-face-top"></span><span class="cc3-face cc3-face-side"></span>
          </div>
          <div class="cc3-node cc3-node-payment" style="--node: var(--cc-pink); --delay: .36s">
            <span class="cc3-face cc3-face-front"><b>payment</b><small>EXT / 03</small></span>
            <span class="cc3-face cc3-face-top"></span><span class="cc3-face cc3-face-side"></span>
          </div>
          <div class="cc3-node cc3-node-stock" style="--node: var(--cc-green); --delay: .54s">
            <span class="cc3-face cc3-face-front"><b>inventory</b><small>DATA / 04</small></span>
            <span class="cc3-face cc3-face-top"></span><span class="cc3-face cc3-face-side"></span>
          </div>
          <div class="cc3-node cc3-node-queue" style="--node: var(--cc-orange); --delay: .72s">
            <span class="cc3-face cc3-face-front"><b>orders</b><small>QUEUE / 05</small></span>
            <span class="cc3-face cc3-face-top"></span><span class="cc3-face cc3-face-side"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
