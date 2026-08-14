import React from 'react'
import { Composition } from 'remotion'
import { AlertFunnel } from './comps/AlertFunnel'
import { ArchAnnotated } from './comps/ArchAnnotated'
import { ArchIncident } from './comps/ArchIncident'
import { ArchPretty } from './comps/ArchPretty'
import { InvestigationReplay } from './comps/InvestigationReplay'
import { MeltModel } from './comps/MeltModel'
import { TraceWaterfall } from './comps/TraceWaterfall'
import { H, W } from './theme'

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="arch-pretty" component={ArchPretty} durationInFrames={180} fps={30} width={W} height={H} />
    <Composition id="arch-incident" component={ArchIncident} durationInFrames={240} fps={30} width={W} height={H} />
    <Composition id="melt-model" component={MeltModel} durationInFrames={280} fps={30} width={W} height={H} />
    <Composition id="alert-funnel" component={AlertFunnel} durationInFrames={210} fps={30} width={W} height={H} />
    <Composition id="arch-annotated" component={ArchAnnotated} durationInFrames={240} fps={30} width={W} height={H} />
    <Composition id="trace-waterfall" component={TraceWaterfall} durationInFrames={125} fps={30} width={W} height={H} />
    <Composition id="investigation-replay" component={InvestigationReplay} durationInFrames={180} fps={30} width={W} height={H} />
  </>
)
