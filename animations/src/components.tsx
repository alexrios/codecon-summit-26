import React, { useEffect, useMemo, useState } from 'react'
import { continueRender, delayRender, staticFile, useCurrentFrame } from 'remotion'
import { C, MONO, SANS } from './theme'

// --- math de paths SVG (segmentos M/L/C absolutos) — síncrono, sem DOM ---
type Pt = { x: number; y: number }

const cubicAt = (p0: Pt, p1: Pt, p2: Pt, p3: Pt, t: number): Pt => {
  const u = 1 - t
  return {
    x: u * u * u * p0.x + 3 * u * u * t * p1.x + 3 * u * t * t * p2.x + t * t * t * p3.x,
    y: u * u * u * p0.y + 3 * u * u * t * p1.y + 3 * u * t * t * p2.y + t * t * t * p3.y,
  }
}

// Ponto na posição t ∈ [0,1] ao longo do path (por comprimento de arco aproximado)
export const pathPointAt = (d: string, t: number): Pt => {
  const cmds = d.match(/[MLC][^MLC]*/g) ?? []
  const samples: Pt[] = []
  let cur: Pt = { x: 0, y: 0 }

  for (const cmd of cmds) {
    const op = cmd[0]
    const nums = cmd.slice(1).trim().split(/[\s,]+/).map(Number)
    if (op === 'M') {
      cur = { x: nums[0], y: nums[1] }
      samples.push(cur)
    } else if (op === 'L') {
      cur = { x: nums[0], y: nums[1] }
      samples.push(cur)
    } else if (op === 'C') {
      const p1 = { x: nums[0], y: nums[1] }
      const p2 = { x: nums[2], y: nums[3] }
      const p3 = { x: nums[4], y: nums[5] }
      for (let i = 1; i <= 32; i++) samples.push(cubicAt(cur, p1, p2, p3, i / 32))
      cur = p3
    }
  }

  const lens: number[] = [0]
  for (let i = 1; i < samples.length; i++) {
    lens.push(lens[i - 1] + Math.hypot(samples[i].x - samples[i - 1].x, samples[i].y - samples[i - 1].y))
  }
  const total = lens[lens.length - 1] || 1
  const target = Math.min(Math.max(t, 0), 1) * total

  for (let i = 1; i < lens.length; i++) {
    if (lens[i] >= target) {
      const seg = (target - lens[i - 1]) / (lens[i] - lens[i - 1] || 1)
      return {
        x: samples[i - 1].x + seg * (samples[i].x - samples[i - 1].x),
        y: samples[i - 1].y + seg * (samples[i].y - samples[i - 1].y),
      }
    }
  }
  return samples[samples.length - 1] ?? { x: 0, y: 0 }
}

export const Fonts: React.FC = () => {
  const [handle] = useState(() => delayRender('Carregando fontes'))

  useEffect(() => {
    // com os arquivos locais já servidos pelo staticFile, o load é determinístico
    Promise.all([
      document.fonts.load("400 18px 'Space Grotesk'"),
      document.fonts.load("500 20px 'Space Grotesk'"),
      document.fonts.load("700 24px 'Space Grotesk'"),
      document.fonts.load("400 16px 'Space Mono'"),
      document.fonts.load("700 16px 'Space Mono'"),
    ])
      .then(() => document.fonts.ready)
      .catch(() => undefined)
      .then(() => continueRender(handle))
  }, [handle])

  return (
    <style>{`
      @font-face {
        font-family: 'Space Grotesk';
        src: url('${staticFile('fonts/SpaceGrotesk-var.ttf')}') format('truetype-variations');
        font-weight: 300 700;
        font-display: block;
      }
      @font-face {
        font-family: 'Space Mono';
        src: url('${staticFile('fonts/SpaceMono-Regular.ttf')}') format('truetype');
        font-weight: 400;
        font-display: block;
      }
      @font-face {
        font-family: 'Space Mono';
        src: url('${staticFile('fonts/SpaceMono-Bold.ttf')}') format('truetype');
        font-weight: 700;
        font-display: block;
      }
    `}</style>
  )
}

// Marcador de seta padrão — declarar uma vez por composição dentro de <defs>
export const ArrowMarker: React.FC<{ id?: string; color?: string }> = ({
  id = 'arrowhead',
  color = C.ink,
}) => (
  <marker id={id} markerWidth="10" markerHeight="8" refX="8" refY="4" orient="auto">
    <path d="M0,0 L10,4 L0,8 Z" fill={color} />
  </marker>
)

export const Arrow: React.FC<{
  d: string
  color?: string
  dashed?: boolean
  width?: number
  markerId?: string
  opacity?: number
}> = ({ d, color = C.ink, dashed = false, width = 2, markerId = 'arrowhead', opacity = 1 }) => (
  <path
    d={d}
    fill="none"
    stroke={color}
    strokeWidth={width}
    strokeDasharray={dashed ? '7 6' : undefined}
    markerEnd={`url(#${markerId})`}
    opacity={opacity}
  />
)

export const EdgeLabel: React.FC<{
  x: number
  y: number
  children: React.ReactNode
  color?: string
}> = ({ x, y, children, color = C.label }) => (
  <text
    x={x}
    y={y}
    textAnchor="middle"
    fontFamily={MONO}
    fontSize={15}
    fill={color}
    fontStyle="italic"
    stroke={C.bg}
    strokeWidth={5}
    style={{ paintOrder: 'stroke' }}
  >
    {children}
  </text>
)

export const Box: React.FC<{
  x: number
  y: number
  w: number
  h: number
  fill: string
  lines: string[]
  textColor?: string
  rx?: number
  stroke?: string
  strokeWidth?: number
  fontSize?: number
  boldFirst?: boolean
  opacity?: number
}> = ({ x, y, w, h, fill, lines, textColor = 'white', rx = 8, stroke, strokeWidth = 0, fontSize = 17, boldFirst = false, opacity = 1 }) => {
  const lineH = fontSize * 1.35
  const startY = y + h / 2 - ((lines.length - 1) * lineH) / 2
  return (
    <g opacity={opacity}>
      <rect x={x} y={y} width={w} height={h} rx={rx} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
      {lines.map((l, i) => (
        <text
          key={i}
          x={x + w / 2}
          y={startY + i * lineH}
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily={SANS}
          fontSize={i === 0 ? fontSize : fontSize - 3}
          fontWeight={boldFirst && i === 0 ? 700 : i === 0 ? 600 : 400}
          fill={textColor}
        >
          {l}
        </text>
      ))}
    </g>
  )
}

export const Cylinder: React.FC<{
  x: number
  y: number
  w: number
  h: number
  fill: string
  label: string
}> = ({ x, y, w, h, fill, label }) => {
  const ry = 14
  return (
    <g>
      <path
        d={`M ${x} ${y + ry} A ${w / 2} ${ry} 0 0 1 ${x + w} ${y + ry} L ${x + w} ${y + h - ry} A ${w / 2} ${ry} 0 0 1 ${x} ${y + h - ry} Z`}
        fill={fill}
      />
      <ellipse cx={x + w / 2} cy={y + ry} rx={w / 2} ry={ry} fill={fill} stroke="rgba(0,0,0,0.18)" strokeWidth={1.5} />
      <text x={x + w / 2} y={y + h / 2 + 8} textAnchor="middle" dominantBaseline="central" fontFamily={SANS} fontSize={17} fontWeight={600} fill="white">
        {label}
      </text>
    </g>
  )
}

export const QueueShape: React.FC<{
  x: number
  y: number
  w: number
  h: number
  fill: string
  label: string
}> = ({ x, y, w, h, fill, label }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx={10} fill={fill} />
    <ellipse cx={x + w} cy={y + h / 2} rx={16} ry={h / 2} fill={fill} stroke="rgba(0,0,0,0.18)" strokeWidth={1.5} />
    <text x={x + w / 2} y={y + h / 2} textAnchor="middle" dominantBaseline="central" fontFamily={SANS} fontSize={17} fontWeight={600} fill={C.ink}>
      {label}
    </text>
  </g>
)

export const Person: React.FC<{ cx: number; cy: number; color?: string; label?: string }> = ({
  cx,
  cy,
  color = '#9FB3C8',
  label,
}) => (
  <g>
    <circle cx={cx} cy={cy - 26} r={16} fill={color} />
    <path d={`M ${cx - 28} ${cy + 38} C ${cx - 28} ${cy + 2} ${cx + 28} ${cy + 2} ${cx + 28} ${cy + 38} Z`} fill={color} />
    {label && (
      <text x={cx} y={cy + 60} textAnchor="middle" fontFamily={SANS} fontSize={16} fontWeight={600} fill={C.ink}>
        {label}
      </text>
    )}
  </g>
)

// Ponto que viaja ao longo de um path SVG. Fade nas pontas mascara a
// transição de ciclo; a trilha não embrulha (sem fantasmas no fim do path).
export const Packet: React.FC<{
  d: string
  period: number // frames para percorrer o path
  offset?: number // fase inicial (frames)
  color?: string
  r?: number
  trail?: boolean
}> = ({ d, period, offset = 0, color = C.blue, r = 7, trail = false }) => {
  const frame = useCurrentFrame()
  const t = (((frame + offset) % period) + period) % period / period

  const pts = useMemo(() => {
    const n = trail ? 4 : 1
    const out: ({ x: number; y: number } | null)[] = []
    for (let i = 0; i < n; i++) {
      const tt = t - i * 0.035
      out.push(tt >= 0 ? pathPointAt(d, tt) : null)
    }
    return out
  }, [d, t, trail])

  const edgeFade = Math.min(t / 0.06, 1) * Math.min((1 - t) / 0.06, 1)

  return (
    <g opacity={edgeFade}>
      {pts.map((p, i) =>
        p ? (
          <circle key={i} cx={p.x} cy={p.y} r={i === 0 ? r : r * 0.6} fill={color} opacity={i === 0 ? 1 : 0.35 - i * 0.08} />
        ) : null,
      )}
    </g>
  )
}

// Pulso de anel que expande e some — para destacar um ponto do diagrama.
// Opacidade em seno: zero nas duas pontas do ciclo, sem "pop" no reinício.
export const Pulse: React.FC<{
  cx: number
  cy: number
  period?: number
  offset?: number
  color?: string
  maxR?: number
}> = ({ cx, cy, period = 60, offset = 0, color = C.red, maxR = 34 }) => {
  const frame = useCurrentFrame()
  const t = (((frame + offset) % period) + period) % period / period
  return (
    <circle
      cx={cx}
      cy={cy}
      r={8 + t * maxR}
      fill="none"
      stroke={color}
      strokeWidth={3 * (1 - t) + 0.5}
      opacity={Math.sin(Math.PI * t)}
    />
  )
}
