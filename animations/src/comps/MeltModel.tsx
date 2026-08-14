import React from 'react'
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion'
import { ArrowMarker, Fonts } from '../components'
import { C, MONO, SANS } from '../theme'

// 03 — MELT como percurso de investigação. O trace context não aparece como
// uma quinta fonte de telemetria: ele faz parte dos mecanismos usados para
// pivotar de um sinal para o próximo.
const STEPS = [
  {
    key: 'metrics',
    x: 45,
    fill: C.svc,
    title: 'Metric',
    verb: 'detecta',
    answer: 'Algo está errado.',
    mechanism: 'janela + exemplar',
  },
  {
    key: 'traces',
    x: 355,
    fill: C.orange,
    title: 'Trace',
    verb: 'localiza',
    answer: 'Onde o tempo parou?',
    mechanism: 'ID propagado',
  },
  {
    key: 'logs',
    x: 665,
    fill: C.store,
    title: 'Log',
    verb: 'explica',
    answer: 'O que aconteceu?',
    mechanism: 'ID registrado + pesquisável',
  },
  {
    key: 'events',
    x: 975,
    fill: C.purple,
    title: 'Event',
    verb: 'contextualiza',
    answer: 'O que mudou?',
    mechanism: 'tempo + serviço + versão',
  },
]

const CARD_W = 260
const CARD_H = 176
const CARD_Y = 260
const STEP_FRAMES = 70

export const MeltModel: React.FC = () => {
  const frame = useCurrentFrame()
  const cycleFrame = frame % (STEP_FRAMES * STEPS.length)
  const active = Math.floor(cycleFrame / STEP_FRAMES)
  const localProgress = (cycleFrame % STEP_FRAMES) / STEP_FRAMES

  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <Fonts />
      <svg viewBox="0 0 1280 600" width="100%" height="100%">
        <defs>
          <ArrowMarker />
        </defs>

        <InvestigationContext />

        {STEPS.slice(0, -1).map((step, i) => {
          const x1 = step.x + CARD_W
          const x2 = STEPS[i + 1].x - 10
          const isCurrentTransition = i === active
          const completed = i < active
          const progress = isCurrentTransition
            ? interpolate(localProgress, [0.48, 0.86], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })
            : completed
              ? 1
              : 0

          return (
            <g key={`${step.key}-arrow`}>
              <line
                x1={x1 + 10}
                y1={CARD_Y + CARD_H / 2}
                x2={x2}
                y2={CARD_Y + CARD_H / 2}
                stroke={C.ink}
                strokeWidth={2.5}
                markerEnd="url(#arrowhead)"
                opacity={0.2 + progress * 0.8}
              />
              {isCurrentTransition && progress > 0 && (
                <circle
                  cx={x1 + 10 + (x2 - x1 - 10) * progress}
                  cy={CARD_Y + CARD_H / 2}
                  r={6}
                  fill={C.blue}
                />
              )}
            </g>
          )
        })}

        {STEPS.map((step, i) => (
          <InvestigationStep key={step.key} {...step} active={i === active} />
        ))}

        <text
          x={640}
          y={505}
          textAnchor="middle"
          fontFamily={MONO}
          fontSize={16}
          fontWeight={700}
          fill={C.ink}
        >
          CORRELATION ID ÚTIL = PROPAGADO + REGISTRADO + PESQUISÁVEL
        </text>
      </svg>
    </AbsoluteFill>
  )
}

const InvestigationContext: React.FC = () => (
  <g>
    <rect x={145} y={105} width={990} height={82} rx={12} fill={C.thread} />
    <text
      x={640}
      y={134}
      textAnchor="middle"
      dominantBaseline="central"
      fontFamily={SANS}
      fontSize={20}
      fontWeight={700}
      fill="white"
    >
      CONTEXTO DE INVESTIGAÇÃO
    </text>
    <text
      x={640}
      y={163}
      textAnchor="middle"
      dominantBaseline="central"
      fontFamily={MONO}
      fontSize={15}
      fill="white"
      opacity={0.86}
    >
      janela de tempo · serviço · correlation / trace ID · versão
    </text>
  </g>
)

type StepProps = (typeof STEPS)[number] & { active: boolean }

const InvestigationStep: React.FC<StepProps> = ({
  x,
  fill,
  title,
  verb,
  answer,
  mechanism,
  active,
}) => (
  <g>
    {active && (
      <rect
        x={x - 6}
        y={CARD_Y - 6}
        width={CARD_W + 12}
        height={CARD_H + 12}
        rx={14}
        fill="none"
        stroke={fill}
        strokeWidth={4}
        opacity={0.72}
      />
    )}
    <rect x={x} y={CARD_Y} width={CARD_W} height={CARD_H} rx={10} fill={fill} opacity={active ? 1 : 0.78} />
    <text
      x={x + CARD_W / 2}
      y={CARD_Y + 38}
      textAnchor="middle"
      dominantBaseline="central"
      fontFamily={SANS}
      fontSize={22}
      fontWeight={700}
      fill="white"
    >
      {title}
    </text>
    <text
      x={x + CARD_W / 2}
      y={CARD_Y + 71}
      textAnchor="middle"
      dominantBaseline="central"
      fontFamily={MONO}
      fontSize={15}
      fontWeight={700}
      fill="white"
    >
      {verb.toUpperCase()}
    </text>
    <text
      x={x + CARD_W / 2}
      y={CARD_Y + 101}
      textAnchor="middle"
      dominantBaseline="central"
      fontFamily={SANS}
      fontSize={17}
      fill="white"
    >
      {answer}
    </text>
    <rect x={x + 16} y={CARD_Y + 127} width={CARD_W - 32} height={34} rx={6} fill="rgba(0,0,0,0.2)" />
    <text
      x={x + CARD_W / 2}
      y={CARD_Y + 144}
      textAnchor="middle"
      dominantBaseline="central"
      fontFamily={MONO}
      fontSize={13}
      fontWeight={700}
      fill="white"
    >
      {mechanism}
    </text>
  </g>
)
