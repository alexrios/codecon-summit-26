import React from 'react'
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion'
import { Architecture } from '../Architecture'
import { Arrow, ArrowMarker, Box, Fonts } from '../components'
import { C } from '../theme'

// 05 — O diagrama interrogado: quatro perguntas para as fronteiras do sistema
// aparecem uma de cada vez, apontando para a fronteira que interrogam.
const NOTES = [
  {
    x: 300, y: 430, w: 300, h: 76,
    lines: ['Trace context atravessa', 'o enqueue(), ou morre aqui?'],
    arrow: 'M 450 428 C 470 400 500 370 520 352',
  },
  {
    x: 950, y: 30, w: 310, h: 76,
    lines: ['Erro original do provider sobrevive,', 'ou some num catch genérico?'],
    arrow: 'M 1105 108 L 1120 138',
  },
  {
    x: 690, y: 480, w: 320, h: 76,
    lines: ['Se o retry rodar 2x, é idempotente', 'ou cobra o cliente duas vezes?'],
    arrow: 'M 850 478 C 860 430 890 380 905 350',
  },
  {
    x: 380, y: 40, w: 280, h: 76,
    lines: ['Essa fila tem dono?', 'Quem vê o backlog crescer?'],
    arrow: 'M 520 118 C 530 160 535 210 535 252',
  },
]

const NOTE_PERIOD = 60 // frames por pergunta

export const ArchAnnotated: React.FC = () => {
  const frame = useCurrentFrame()
  const active = Math.floor(frame / NOTE_PERIOD) % NOTES.length

  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <Fonts />
      <svg viewBox="0 0 1280 600" width="100%" height="100%">
        <defs>
          <ArrowMarker id="note-arrow" color={C.red} />
        </defs>
        <Architecture />
        {NOTES.map((n, i) => {
          const opacity = interpolate(frame, [i * NOTE_PERIOD + 4, i * NOTE_PERIOD + 16, (i + 1) * NOTE_PERIOD - 10, (i + 1) * NOTE_PERIOD - 2], [0, 1, 1, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          })
          if (i !== active && opacity <= 0) return null
          return (
            <g key={i} opacity={opacity}>
              <Arrow d={n.arrow} color={C.red} dashed width={2.2} markerId="note-arrow" />
              <Box x={n.x} y={n.y} w={n.w} h={n.h} fill={C.redSoft} stroke={C.red} strokeWidth={2.5}
                textColor={C.red} lines={n.lines} fontSize={16} />
            </g>
          )
        })}
      </svg>
    </AbsoluteFill>
  )
}
