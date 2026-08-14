import React from 'react'
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion'
import { Fonts } from '../components'
import { C, MONO, SANS } from '../theme'

// Waterfall de trace: o incidente visto por dentro. Spans aninhados, o do
// provedor externo estourando em vermelho, trace_id fixo no topo.
// Roda uma vez só: fade in → sweep do playhead revelando spans → pulso no
// span ruim → segura o waterfall completo no último frame.

type Span = {
  label: string
  start: number // ms
  dur: number // ms
  color: string
  depth: number
  bad?: boolean
}

const SPANS: Span[] = [
  { label: 'api-gateway · POST /checkout', start: 0, dur: 3200, color: C.svc, depth: 0 },
  { label: 'fila-pedidos · enqueue', start: 120, dur: 200, color: C.queue, depth: 1 },
  { label: 'pagamento · process', start: 450, dur: 2700, color: C.svc, depth: 1 },
  { label: 'db · insert pedido', start: 600, dur: 180, color: C.store, depth: 2 },
  { label: 'provedor-externo · POST /charge', start: 800, dur: 2250, color: C.red, depth: 2, bad: true },
]

const TOTAL_MS = 3200
const X0 = 360
const X1 = 1230
const PX_PER_MS = (X1 - X0) / TOTAL_MS
const ROW_H = 62
const BAR_H = 26
const Y0 = 118

export const TraceWaterfall: React.FC = () => {
  const frame = useCurrentFrame()

  // fade in suave; sem fade out — o vídeo não faz loop, então o último
  // frame segura o waterfall completo
  const fade = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  // playhead varre 0→3400ms entre f12 e f88
  const playheadMs = interpolate(frame, [12, 88], [0, 3400], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  // pulso do span ruim: 2 ciclos e depois assenta em brilho cheio,
  // pro vídeo terminar com o span em destaque (sem loop).
  // em f100 o seno vale 0 → pulso 0.8, então a rampa 0.8→1 é contínua
  const pulse =
    frame < 100
      ? 0.8 + 0.2 * Math.sin((frame * Math.PI * 2 * 3) / 150)
      : interpolate(frame, [100, 112], [0.8, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const badgeOpacity = interpolate(frame, [96, 110], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <Fonts />
      <svg viewBox="0 0 1280 600" width="100%" height="100%">
        <g opacity={fade}>
          {/* cabeçalho */}
          <text x={40} y={48} fontFamily={MONO} fontSize={16} fill={C.ink} fontWeight={700}>
            trace_id: 4f2a91c0e7b3…9c1e
          </text>
          <text x={1240} y={48} textAnchor="end" fontFamily={MONO} fontSize={14} fill={C.label}>
            1 request · 5 spans · 3.2s
          </text>

          {/* eixo de tempo */}
          {[0, 800, 1600, 2400, 3200].map((ms) => (
            <g key={ms}>
              <line
                x1={X0 + ms * PX_PER_MS}
                y1={82}
                x2={X0 + ms * PX_PER_MS}
                y2={Y0 + SPANS.length * ROW_H - 10}
                stroke={C.label}
                strokeWidth={1}
                opacity={0.25}
              />
              <text x={X0 + ms * PX_PER_MS} y={74} textAnchor="middle" fontFamily={MONO} fontSize={13} fill={C.label}>
                {ms === 0 ? '0' : `${(ms / 1000).toFixed(1)}s`}
              </text>
            </g>
          ))}

          {/* spans */}
          {SPANS.map((s, i) => {
            const y = Y0 + i * ROW_H
            const reveal = Math.min(Math.max((playheadMs - s.start) / s.dur, 0), 1)
            const w = s.dur * PX_PER_MS * reveal
            const labelOpacity = Math.min(Math.max((playheadMs - s.start) / 120, 0), 1)
            return (
              <g key={s.label}>
                <text
                  x={40 + s.depth * 22}
                  y={y + BAR_H / 2}
                  dominantBaseline="central"
                  fontFamily={MONO}
                  fontSize={14.5}
                  fill={s.bad ? C.red : C.ink}
                  fontWeight={s.bad ? 700 : 400}
                  opacity={labelOpacity}
                >
                  {s.label}
                </text>
                {s.bad && w > 0 && (
                  <rect
                    x={X0 + s.start * PX_PER_MS - 5}
                    y={y - 5}
                    width={w + 10}
                    height={BAR_H + 10}
                    rx={10}
                    fill="none"
                    stroke={C.red}
                    strokeWidth={3}
                    opacity={pulse * badgeOpacity}
                  />
                )}
                {w > 0 && (
                  <rect
                    x={X0 + s.start * PX_PER_MS}
                    y={y}
                    width={Math.max(w, 4)}
                    height={BAR_H}
                    rx={7}
                    fill={s.color}
                    opacity={s.bad ? pulse : 0.92}
                  />
                )}
              </g>
            )
          })}

          {/* badge do timeout no span ruim */}
          <g opacity={badgeOpacity}>
            <rect x={X0 + 800 * PX_PER_MS - 12} y={Y0 + 4 * ROW_H + 34} width={190} height={30} rx={15} fill={C.redSoft} stroke={C.red} strokeWidth={1.5} />
            <text
              x={X0 + 800 * PX_PER_MS + 83}
              y={Y0 + 4 * ROW_H + 49}
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily={MONO}
              fontSize={13.5}
              fontWeight={700}
              fill={C.red}
            >
              timeout · 2250ms
            </text>
          </g>

          {/* playhead */}
          <line
            x1={X0 + Math.min(playheadMs, TOTAL_MS) * PX_PER_MS}
            y1={86}
            x2={X0 + Math.min(playheadMs, TOTAL_MS) * PX_PER_MS}
            y2={Y0 + SPANS.length * ROW_H - 10}
            stroke={C.ink}
            strokeWidth={2}
            opacity={interpolate(playheadMs, [0, 200, 3200, 3400], [0, 0.7, 0.7, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })}
          />
        </g>
      </svg>
    </AbsoluteFill>
  )
}
