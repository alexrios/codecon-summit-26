import React from 'react'
import { AbsoluteFill, useCurrentFrame } from 'remotion'
import { Architecture, GEO, PATHS } from '../Architecture'
import { Arrow, ArrowMarker, Box, Fonts, Packet, Person } from '../components'
import { C, MONO } from '../theme'

// 02 — O ritual de sempre: o engenheiro pula de log em log, cada serviço
// gritando no seu formato, e o retry storm triplicando o tráfego no provider.
export const ArchIncident: React.FC = () => {
  const frame = useCurrentFrame()
  // flicker periódico: 8 ciclos exatos na duração do comp (240f), sem salto no loop
  const flicker = 0.55 + 0.45 * Math.sin((frame * Math.PI * 2 * 8) / 240)

  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <Fonts />
      <svg viewBox="0 0 1280 600" width="100%" height="100%">
        <Architecture />

        {/* área comum onde o engenheiro consulta os registros */}
        <rect x={190} y={410} width={720} height={150} rx={12} fill="#F8FAFC" stroke={C.label} strokeWidth={2.5} />
        <text x={215} y={440} fontFamily={MONO} fontSize={16} fontWeight={700} fill={C.ink}>LOGS</text>
        <text x={885} y={548} textAnchor="end" fontFamily={MONO} fontSize={12} fill={C.label}>3 formatos · nenhuma correlação</text>

        {/* cada sistema alimenta seu registro dentro do painel de logs */}
        <defs>
          <ArrowMarker id="log-source" color={C.red} />
          <ArrowMarker id="dash" color={C.label} />
        </defs>
        <Arrow d="M 275 345 C 275 390 315 420 315 455" dashed color={C.red} markerId="log-source" width={2} />
        <Arrow d="M 535 345 L 555 455" dashed color={C.red} markerId="log-source" width={2} />
        <Arrow d="M 825 345 C 825 390 795 420 795 455" dashed color={C.red} markerId="log-source" width={2} />

        {/* retry storm: três pacotes sobrepostos indo ao provider */}
        <Packet d={PATHS.charge} period={60} offset={0} color={C.red} r={6} />
        <Packet d={PATHS.charge} period={60} offset={20} color={C.red} r={6} />
        <Packet d={PATHS.charge} period={60} offset={40} color={C.red} r={6} />

        {/* provider piscando em alerta */}
        <rect
          x={GEO.provider.x}
          y={GEO.provider.y}
          width={GEO.provider.w}
          height={GEO.provider.h}
          rx={8}
          fill="none"
          stroke={C.red}
          strokeWidth={4}
          opacity={flicker}
        />
        {/* um painel de logs, mas ainda sem uma história correlacionada */}
        <Box x={210} y={455} w={210} h={72} fill={C.redSoft} stroke={C.red} strokeWidth={2} textColor={C.red}
          lines={['API GATEWAY', '502, 502, 502…']} fontSize={14} boldFirst />
        <Box x={450} y={455} w={210} h={72} fill={C.redSoft} stroke={C.red} strokeWidth={2} textColor={C.red}
          lines={['FILA DE PEDIDOS', 'backlog crescendo']} fontSize={14} boldFirst />
        <Box x={690} y={455} w={210} h={72} fill={C.redSoft} stroke={C.red} strokeWidth={2} textColor={C.red}
          lines={['PAGAMENTO', 'timeout, timeout…']} fontSize={14} boldFirst />

        {/* engenheiro e logs formam juntos a faixa de investigação */}
        <Person cx={100} cy={485} color="#B7C4D1" />
        <text x={100} y={548} textAnchor="middle" fontFamily={MONO} fontSize={12} fill={C.label}>
          Engenheiro de plantão
        </text>
        <Arrow d="M 140 485 L 190 485" dashed color={C.label} markerId="dash" width={1.8} />
      </svg>
    </AbsoluteFill>
  )
}
