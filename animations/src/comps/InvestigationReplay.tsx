import React from 'react'
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion'
import { Fonts } from '../components'
import { C, MONO, SANS } from '../theme'

// O replay do incidente: a mesma noite, duas linhas do tempo.
// Em cima, os 45 min do jeito antigo (caça aos logs, esmaecido).
// Embaixo, a investigação curta — 5 passos que se acendem em sequência.
// Fade global nas pontas: frame 0 e frame 179 idênticos.

const STEPS = [
  { title: 'alerta com contexto', sub: 'SLO · burn 10×' },
  { title: 'abre o trace', sub: 'span: provedor' },
  { title: 'filtra o log', sub: 'trace_id' },
  { title: 'checa eventos', sub: 'deploy 02:08' },
  { title: 'contém o impacto', sub: 'modo degradado' },
]

const STEP_FRAMES = 36 // 180f / 5 passos — ciclo exato, sem salto no loop
const X0 = 300
const X1 = 1060
const TRACK_A_Y = 180
const TRACK_B_Y = 430

// marcas de "caça aos logs" na timeline antiga (posições fixas, pseudo-aleatórias)
const OLD_TICKS = [0.06, 0.13, 0.21, 0.28, 0.36, 0.44, 0.5, 0.58, 0.65, 0.72, 0.8, 0.87, 0.93]

export const InvestigationReplay: React.FC = () => {
  const frame = useCurrentFrame()

  const fade =
    interpolate(frame, [0, 10], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) *
    interpolate(frame, [168, 180], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  const stepX = (i: number) => X0 + ((i + 0.5) / STEPS.length) * (X1 - X0)

  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <Fonts />
      <svg viewBox="0 0 1280 600" width="100%" height="100%">
        <g opacity={fade}>
          {/* ---- timeline antiga: 45 min de caça aos logs ---- */}
          <text x={X0} y={TRACK_A_Y - 66} fontFamily={MONO} fontSize={14} fill={C.label}>
            o jeito de sempre
          </text>
          <line x1={X0} y1={TRACK_A_Y} x2={X1} y2={TRACK_A_Y} stroke={C.label} strokeWidth={3} opacity={0.45} />
          {OLD_TICKS.map((t) => (
            <line
              key={t}
              x1={X0 + t * (X1 - X0)}
              y1={TRACK_A_Y - 12}
              x2={X0 + t * (X1 - X0)}
              y2={TRACK_A_Y + 12}
              stroke={C.red}
              strokeWidth={2.5}
              opacity={0.4}
            />
          ))}
          <text x={X0} y={TRACK_A_Y + 34} fontFamily={MONO} fontSize={13.5} fill={C.label}>
            2h13
          </text>
          <text x={X1} y={TRACK_A_Y + 34} textAnchor="end" fontFamily={MONO} fontSize={13.5} fill={C.label}>
            2h58
          </text>
          <text x={X1 + 34} y={TRACK_A_Y} dominantBaseline="central" fontFamily={SANS} fontSize={26} fontWeight={700} fill={C.label} opacity={0.75}>
            45 min
          </text>
          <text x={X0} y={TRACK_A_Y - 40} fontFamily={MONO} fontSize={12.5} fill={C.label} opacity={0.8}>
            502… timeout de quê?… fila crescendo… 502…
          </text>

          {/* ---- timeline nova: investigação curta, 5 passos ---- */}
          <text x={X0} y={TRACK_B_Y - 158} fontFamily={MONO} fontSize={14} fontWeight={700} fill={C.ink}>
            projetado pra ser investigado
          </text>
          <line x1={X0} y1={TRACK_B_Y} x2={X1} y2={TRACK_B_Y} stroke={C.ink} strokeWidth={3} opacity={0.2} />

          {/* progresso preenchido até o passo ativo */}
          <line
            x1={X0}
            y1={TRACK_B_Y}
            x2={X0 + Math.min((frame + 1) / (STEP_FRAMES * STEPS.length), 1) * (X1 - X0) * 0.999}
            y2={TRACK_B_Y}
            stroke={C.store}
            strokeWidth={4}
            strokeLinecap="round"
          />

          {STEPS.map((s, i) => {
            const local = interpolate(frame, [i * STEP_FRAMES, i * STEP_FRAMES + 18], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })
            const active = frame >= i * STEP_FRAMES
            const x = stepX(i)
            const cardY = TRACK_B_Y - 138
            return (
              <g key={s.title}>
                {/* card do passo */}
                <g opacity={local}>
                  <rect x={x - 72} y={cardY} width={144} height={64} rx={10} fill="white" stroke={C.store} strokeWidth={2} />
                  <text x={x} y={cardY + 26} textAnchor="middle" fontFamily={SANS} fontSize={13} fontWeight={700} fill={C.ink}>
                    {s.title}
                  </text>
                  <text x={x} y={cardY + 48} textAnchor="middle" fontFamily={MONO} fontSize={10.5} fill={C.label}>
                    {s.sub}
                  </text>
                  <line x1={x} y1={cardY + 64} x2={x} y2={TRACK_B_Y - 14} stroke={C.store} strokeWidth={2} opacity={0.6} />
                </g>
                {/* nó na trilha */}
                <circle
                  cx={x}
                  cy={TRACK_B_Y}
                  r={13}
                  fill={active ? C.store : C.bg}
                  stroke={active ? C.store : C.label}
                  strokeWidth={3}
                  opacity={active ? 1 : 0.5}
                />
                {active && (
                  <text x={x} y={TRACK_B_Y} textAnchor="middle" dominantBaseline="central" fontFamily={MONO} fontSize={13} fontWeight={700} fill="white">
                    {i + 1}
                  </text>
                )}
              </g>
            )
          })}

          <text x={X0} y={TRACK_B_Y + 34} fontFamily={MONO} fontSize={13.5} fill={C.ink}>
            2h13
          </text>
          <text x={X1} y={TRACK_B_Y + 34} textAnchor="end" fontFamily={MONO} fontSize={13.5} fill={C.ink}>
            impacto contido
          </text>
          <text x={X1 + 34} y={TRACK_B_Y} dominantBaseline="central" fontFamily={SANS} fontSize={24} fontWeight={700} fill={C.store}>
            em minutos
          </text>
        </g>
      </svg>
    </AbsoluteFill>
  )
}
