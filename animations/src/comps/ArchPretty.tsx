import React from 'react'
import { AbsoluteFill } from 'remotion'
import { Architecture, GEO, PATHS } from '../Architecture'
import { Fonts, Packet } from '../components'
import { C } from '../theme'

// 01 — O diagrama aprovado: tudo calmo, um pedido atravessando o sistema.
export const ArchPretty: React.FC = () => (
  <AbsoluteFill style={{ background: C.bg }}>
    <Fonts />
    <svg viewBox="0 0 1280 600" width="100%" height="100%">
      <Architecture />
      <Packet d={PATHS.request} period={180} color={C.blue} trail />
      <Packet d={PATHS.write} period={180} offset={90} color={C.store} r={5} />
    </svg>
  </AbsoluteFill>
)
