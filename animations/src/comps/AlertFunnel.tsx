import React from 'react'
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion'
import { Fonts } from '../components'
import { MONO, SANS } from '../theme'

const BG = '#0a0a0c'
const PANEL = '#101419'
const INK = '#f0eeeb'
const DIM = '#a8a39d'
const FAINT = '#77736e'
const BLUE = '#7cc4ff'
const YELLOW = '#ffcc21'
const RED = '#ff5f56'
const GREEN = '#acf986'

const reveal = (frame: number, start: number, duration = 14) => ({
  opacity: interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  }),
  offset: interpolate(frame, [start, start + duration], [-28, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  }),
})

const RuleCard: React.FC<{
  y: number
  start: number
  rule: string
  title: string
  detail: string
  color: string
}> = ({ y, start, rule, title, detail, color }) => {
  const frame = useCurrentFrame()
  const { opacity, offset } = reveal(frame, start)

  return (
    <g opacity={opacity} transform={`translate(${offset} 0)`}>
      <rect x={58} y={y} width={462} height={108} fill={PANEL} stroke={color} strokeWidth={1.5} />
      <rect x={58} y={y} width={7} height={108} fill={color} />
      <text x={88} y={y + 29} fontFamily={MONO} fontSize={14} letterSpacing={2} fill={color}>{rule}</text>
      <text x={88} y={y + 61} fontFamily={SANS} fontSize={23} fontWeight={650} fill={INK}>{title}</text>
      <text x={88} y={y + 86} fontFamily={SANS} fontSize={16} fill={DIM}>{detail}</text>
    </g>
  )
}

export const AlertFunnel: React.FC = () => {
  const frame = useCurrentFrame()
  const final = reveal(frame, 116, 18)

  const connectorOpacity = (start: number) => interpolate(frame, [start, start + 16], [0, 0.75], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <AbsoluteFill style={{ background: BG }}>
      <Fonts />
      <svg viewBox="0 0 1280 600" width="100%" height="100%">
        <defs>
          <marker id="alert-arrow" markerWidth="10" markerHeight="8" refX="8" refY="4" orient="auto">
            <path d="M0,0 L10,4 L0,8 Z" fill={BLUE} />
          </marker>
        </defs>

        <RuleCard y={68} start={10} rule="REGRA 01" title="Monitore para quem usa" detail="12% não concluem a compra" color={BLUE} />
        <RuleCard y={246} start={44} rule="REGRA 02" title="Dê contexto ao número" detail="o error budget acaba em 4 h" color={YELLOW} />
        <RuleCard y={424} start={78} rule="REGRA 03" title="Proteja a atenção humana" detail="uma pessoa precisa agir agora" color={RED} />

        <path d="M 530 122 C 620 122 620 278 704 278" fill="none" stroke={BLUE} strokeWidth={2} markerEnd="url(#alert-arrow)" opacity={connectorOpacity(25)} />
        <path d="M 530 300 L 704 300" fill="none" stroke={YELLOW} strokeWidth={2} markerEnd="url(#alert-arrow)" opacity={connectorOpacity(59)} />
        <path d="M 530 478 C 620 478 620 322 704 322" fill="none" stroke={RED} strokeWidth={2} markerEnd="url(#alert-arrow)" opacity={connectorOpacity(93)} />

        <g opacity={final.opacity} transform={`translate(${final.offset} 0)`}>
          <rect x={720} y={74} width={500} height={452} fill={PANEL} stroke={RED} strokeWidth={2} />
          <rect x={720} y={74} width={500} height={76} fill={RED} />
          <text x={750} y={123} fontFamily={MONO} fontSize={15} letterSpacing={3} fill={BG}>PRECISA AGIR AGORA</text>
          <text x={1187} y={128} textAnchor="end" fontFamily={SANS} fontSize={38} fontWeight={700} fill={BG}>PÁGINA</text>

          <text x={756} y={205} fontFamily={MONO} fontSize={14} letterSpacing={2} fill={FAINT}>RESULTADO</text>
          <text x={756} y={240} fontFamily={SANS} fontSize={26} fontWeight={650} fill={INK}>Checkout falhando</text>

          <line x1={756} y1={270} x2={1184} y2={270} stroke="#2c3239" />
          <text x={756} y={310} fontFamily={MONO} fontSize={14} letterSpacing={2} fill={FAINT}>CONTEXTO</text>
          <text x={756} y={344} fontFamily={SANS} fontSize={21} fill={INK}>12% dos usuários afetados</text>
          <text x={756} y={377} fontFamily={SANS} fontSize={18} fill={YELLOW}>Error budget acaba em 4 h</text>

          <rect x={756} y={420} width={428} height={65} fill="#182019" stroke={GREEN} strokeWidth={1} />
          <text x={778} y={446} fontFamily={MONO} fontSize={13} letterSpacing={1.5} fill={GREEN}>PRIMEIRA AÇÃO</text>
          <text x={778} y={470} fontFamily={SANS} fontSize={17} fill={INK}>abrir o trace do checkout</text>
        </g>
      </svg>
    </AbsoluteFill>
  )
}
