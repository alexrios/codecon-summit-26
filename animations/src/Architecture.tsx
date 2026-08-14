import React from 'react'
import { Arrow, ArrowMarker, Box, Cylinder, EdgeLabel, Person, QueueShape } from './components'
import { C } from './theme'

// Geometria da arquitetura base (cliente → gateway → fila → pagamento → provider/db)
export const GEO = {
  client: { cx: 100, cy: 300 },
  gateway: { x: 190, y: 255, w: 170, h: 90 },
  queue: { x: 440, y: 255, w: 190, h: 90 },
  payment: { x: 720, y: 255, w: 210, h: 90 },
  provider: { x: 1000, y: 140, w: 240, h: 80 },
  db: { x: 1010, y: 380, w: 200, h: 95 },
}

export const PATHS = {
  http: 'M 140 300 L 190 300',
  enqueue: 'M 360 300 L 440 300',
  process: 'M 646 300 L 720 300',
  charge: 'M 930 272 C 968 262 972 200 1000 188',
  write: 'M 930 328 C 972 340 970 408 1010 418',
  // caminho contínuo do pedido, do cliente ao provider (para o pacote viajar)
  request: 'M 140 300 L 890 300 C 950 296 955 210 1000 188',
}

// Diagrama estático compartilhado pelas composições 01, 02 e 05
export const Architecture: React.FC = () => (
  <g>
    <defs>
      <ArrowMarker />
    </defs>
    <Arrow d={PATHS.http} />
    <Arrow d={PATHS.enqueue} />
    <Arrow d={PATHS.process} />
    <Arrow d={PATHS.charge} />
    <Arrow d={PATHS.write} />
    <Person cx={GEO.client.cx} cy={GEO.client.cy} label="Cliente" />
    <Box {...GEO.gateway} fill={C.svc} lines={['API Gateway']} />
    <QueueShape {...GEO.queue} fill={C.queue} label="Fila de Pedidos" />
    <Box {...GEO.payment} fill={C.svc} lines={['Serviço de Pagamento']} />
    <Box {...GEO.provider} fill={C.external} lines={['Provedor de Pagamento Externo']} fontSize={15} />
    <Cylinder {...GEO.db} fill={C.store} label="Banco de Dados" />
    <EdgeLabel x={165} y={284}>HTTP</EdgeLabel>
    <EdgeLabel x={400} y={238}>enqueue()</EdgeLabel>
    <EdgeLabel x={683} y={238}>process()</EdgeLabel>
    <EdgeLabel x={962} y={228}>charge()</EdgeLabel>
    <EdgeLabel x={984} y={372}>write</EdgeLabel>
  </g>
)
