# Além do diagrama de caixinhas: Projetando sistemas que você consegue investigar

**CodeCon Summit 26 · 30 min · plateia mista**

> Todo mundo sabe desenhar caixinhas e setinhas num diagrama de arquitetura. API Gateway
> aqui, fila ali, banco acolá. Bonito no Miro, aprovado na design review. Mas aí chega às
> 2 da manhã, o alerta toca, e você descobre que ninguém pensou em como investigar aquilo
> quando desse errado.

Nota de produção: a história de incidente usada como fio condutor é **composta a partir
de incidentes reais** e não representa um caso específico de nenhuma empresa. Dizer isso
com naturalidade antes do replay final.

---

## 1. Cold open — o incidente (0:00–3:00 · 3 min)

**Objetivo:** prender a plateia com uma cena concreta e visceral antes de qualquer conceito.

Fala-chave (primeira pessoa, tom de história contada, não de slide de bullet):

> "2h13 da manhã. O celular vibra em cima da mesa de cabeceira. PagerDuty: *checkout error
> rate acima do threshold*. Eu abro o notebook ainda no escuro e faço a única coisa que sei
> fazer: abro o diagrama de arquitetura. Aquele mesmo que a gente desenhou faz três meses,
> que todo mundo aprovou na design review, bonito, com as setinhas certinhas — API Gateway,
> fila de pedidos, serviço de pagamento, banco.
>
> E aí eu percebo: esse diagrama não me diz absolutamente nada sobre o que está acontecendo
> *agora*. Ele me diz como o sistema foi desenhado. Não me diz onde ele está doendo.
>
> Então eu começo o ritual de sempre. Abro o log do API Gateway — nada muito óbvio, só um
> monte de 502. Abro o log do serviço de pagamento — tá cheio de timeout, mas timeout de
> quê? Abro o log da fila — tá crescendo, mensagens acumulando. Cada log é de um serviço
> diferente, cada um com o próprio formato, nenhum com um jeito de saber 'esses três logs
> são sobre o mesmo pedido'.
>
> Quarenta e cinco minutos depois — quarenta e cinco minutos em que o checkout do site
> ficou capengando pros usuários — eu finalmente monto o quebra-cabeça: um provedor de
> pagamento externo ficou lento, os retries automáticos triplicaram o tráfego pra ele,
> criou uma retry storm, e a fila simplesmente afogou."

Transição: "O diagrama tava certo. A arquitetura tava certa. O que faltou não foi
arquitetura — foi ter projetado esse sistema pra ser investigado."

---

## 2. Reframe — a tese (3:00–5:30 · 2:30 min)

**Objetivo:** nomear o problema central antes de entrar em conceitos técnicos.

Pontos:
- O diagrama de caixinhas responde uma pergunta: **"essa arquitetura faz sentido?"**
- Às 2h da manhã a pergunta é outra: **"quando essa caixa quebrar, como eu vou saber o
  quê, onde, e por quê?"**
- São duas metas de design diferentes. A gente trata como se fossem a mesma coisa — e por
  isso a segunda nunca entra na design review.

Fala-chave (tese da talk, dita devagar, é a frase que a plateia deveria levar embora):

> "Fazer funcionar é só o começo. Engenharia é assumir que alguma coisa vai dar errado,
> decidir como essa falha será contida e construir os sinais que nos permitam descobri-la
> antes que o usuário precise nos contar. Investigabilidade é como o sistema participa
> dessa conversa."

Frase no slide:

> "Fazer funcionar é desafio de junior e pleno. Quando algo der errado, o sistema precisa conter o
> impacto e deixar pistas para a gente descobrir antes do usuário."

---

## 3. Pilar 1 — MELT como vocabulário de investigabilidade (5:30–15:30 · 10 min)

**Objetivo:** dar às pessoas um vocabulário compartilhado pros quatro tipos de sinal, e
mostrar que a força está em conectá-los, não em ter cada um isoladamente.

### 3.1 Os quatro sinais, separadamente

Apresentar cada sinal com a mesma estrutura: pergunta principal, exemplo concreto do
incidente e o que ele deixa em aberto.

- **Metric** — "Qual é o tamanho do problema?" Ex.: taxa de erro, latência p99,
  profundidade da fila. Mostra escala e tendência, não qual pedido falhou.
- **Event** — "O que mudou?" Ex.: deploy, feature flag, configuração. Registra fatos e
  tempo, mas não prova causalidade.
- **Log** — "O que este componente observou?" Ex.: erro, tentativa e contexto estruturado.
  Explica um ponto local, não o caminho completo nem o impacto agregado.
- **Trace** — "Por onde esta operação passou?" Ex.: spans do gateway ao provedor externo.
  Localiza tempo e erro numa operação, mas não mostra sozinho a escala do incidente.

Fechar com um resumo: nenhum sinal é melhor; cada um reduz um tipo diferente de incerteza.
A ordem MELT serve para memorizar o vocabulário, não como receita fixa de investigação.

### 3.2 O ponto central: nenhum sinal sozinho conta a história

> "Reparem: no meu incidente, eu tinha métrica (erro subindo), eu tinha logs (timeouts,
> filas crescendo). O que eu não tinha era um jeito de **pivotar** de um pro outro. Cada
> sinal vivia na sua ilha."

Introduzir os **pivôs de investigação**:
- Métrica leva ao trace por janela, exemplar ou deep link
- Trace leva ao log por `trace_id`, serviço e span
- Trace/log leva aos events por tempo, serviço e versão

Trace context / trace ID é uma dessas chaves, não o tecido conjuntivo inteiro. Ele só
vira mecanismo de investigação quando é propagado, preservado em async/retries, registrado
como campo estruturado, indexado e integrado a alertas e links entre ferramentas.

Frase de virada, importante — isso é o gancho pro pilar 2 e pra nota final:

> "E aqui já cabe a primeira correção pro diagrama de caixinhas: trace context não é
> detalhe de implementação de observabilidade. É uma decisão de arquitetura. Se ele não
> atravessa a fila, não sobrevive ao retry, não é passado pro job assíncrono — a história
> quebra exatamente na fronteira que você desenhou como uma setinha inocente no Miro."

---

## 4. Pilar 2 — SLOs e alertas acionáveis (15:30–25:00 · 9:30 min)

**Objetivo:** resolver o outro defeito do incidente — o alerta que tocou não ajudou em nada
— e dar um modelo prático pra alertas melhores.

### 4.1 Causa vs. sintoma do usuário

> "O alerta que me acordou dizia 'CPU em 85%'. Isso é uma causa possível, não o problema
> do usuário. Pode ter failover, retry ou capacidade sobrando e ninguém estar sentindo
> nada. O usuário não sabe que o banco existe. Ele sabe que o checkout falhou."

Contraste:
- Alerta em **causa**: "CPU em 85%", "um nó do banco caiu", "fila crescendo" — descreve
  uma peça interna e tende a duplicar alertas, criar dependências e acordar alguém mesmo
  quando a arquitetura absorveu a falha
- Alerta em **sintoma**: "checkout falhando", "latência vista pelo cliente aumentou",
  "saldo está desatualizado" — mede disponibilidade, latência, correção ou frescor do
  ponto mais próximo possível da experiência do usuário

Exceção importante: causas ainda merecem página quando antecipam um problema inevitável,
como disco ou quota que vai acabar em poucas horas. Fora disso, elas entram como contexto
de investigação no alerta de sintoma ou no dashboard.

### 4.2 SLI / SLO / error budget, rápido e prático

- **SLI** (Service Level Indicator): a métrica que representa a experiência do usuário
  (ex: % de checkouts concluídos com sucesso)
- **SLO** (Service Level Objective): o alvo aceitável pra essa métrica (ex: 99.5% em 30
  dias)
- **Error budget**: o quanto você ainda pode falhar sem violar o SLO — e é isso que
  transforma "subiu um erro" em "isso importa ou é ruído"

Não é preciso se aprofundar em matemática de burn rate na talk — o ponto é conceitual:
error budget dá **prioridade** ao alerta. Sem ele, todo alerta grita igual.

### 4.3 Página ou ticket?

Antes de criar uma regra de paging, quatro testes:
1. **Urgente** — precisa de ação agora, não amanhã de manhã?
2. **Importante** — há impacto real ou iminente para o usuário?
3. **Acionável** — existe uma ação humana útil a tomar?
4. **Real** — o sinal exclui casos benignos conhecidos?

Se precisa de atenção, mas não agora, vira ticket ou relatório com dono e prazo. Email ou
canal sem workflow vira ruído ignorado. Se a resposta é sempre "olhei e não era nada", a
regra está quebrada: refine, rebaixe ou remova.

### 4.4 O que faz um alerta ser acionável (uso do diagrama `04-alert-funnel`)

Um alerta acionável responde, no próprio texto do alerta ou a um clique de distância:
1. **O quê** quebrou (do ponto de vista do usuário, não do serviço)
2. **Pra quem** / quanto impacto (todo mundo? um segmento? um cliente grande?)
3. **Quão grave** (burn rate, não só "passou do threshold")
4. **Por onde começar a investigar** — idealmente um link direto pro trace/dashboard
   filtrado pela mesma janela de tempo e pelo mesmo contexto do pilar anterior
5. **Quais causas já estão disparando** — como contexto para leitura rápida, não como
   páginas duplicadas

> "Reparem que isso conecta direto com o pilar anterior: o alerta bom não é só melhor
> texto. Ele é a porta de entrada pro MELT que a gente acabou de montar. Um alerta
> acionável *é* o primeiro passo da investigação, não só um aviso de dopamina."

O runbook deve explicar brevemente o significado do alerta, a primeira ação e o contexto
temporário relevante. Se virou um fluxograma enorme de respostas mecânicas, vale
automatizar a resposta e corrigir o sistema em vez de exigir que o on-call seja um robô.

### 4.5 Replay parcial do incidente

> "Com esse modelo, o alerta que me acorda às 2h13 diz: 'SLO de checkout queimando a 10x
> o ritmo normal, 12% dos usuários afetados, budget restante acaba em 4h. Também
> disparando: timeouts no payment
> service. Ver trace'. A página nasce no sintoma; a causa vem junto como pista. Eu não
> abro mais o diagrama do Miro. Eu abro o trace."

---

## 5. Nota rápida — design para investigabilidade (25:00–28:00 · 3 min)

**Objetivo:** dar uma pincelada honesta em que isso vira decisão de arquitetura — sem se
aprofundar, só plantar a semente. Usar o diagrama `05-architecture-annotated` (o mesmo
diagrama do cold open, agora anotado).

Perguntas que deveriam entrar na design review, ditas rápido, em tom de lista:

- "Trace context atravessa toda fronteira async daqui — fila, retry, job em background —
  ou ele morre no primeiro `.enqueue()`?"
- "Se essa operação rodar duas vezes por causa de um retry, ela é idempotente, ou vai
  cobrar o cliente duas vezes?"
- "Quando um retry falha e a gente desiste, o erro original ainda existe em algum lugar,
  ou ele foi engolido por um `catch` genérico?"
- "Essa fila tem dono? Quando o backlog crescer, alguém vai saber antes de afetar o SLO?"

Frase de fechamento da seção:

> "Nenhuma dessas perguntas aparece no diagrama de caixinhas. E é exatamente por isso que
  elas nunca são feitas na hora que ainda é barato responder."

---

## 6. Fechamento (28:00–30:00 · 2 min)

**Objetivo:** fechar o círculo da história e deixar uma ação concreta, memorável, fácil de
levar pra próxima design review da plateia.

Replay completo do incidente, versão redesenhada. Antes de começar, dizer: "Esta é uma
história composta a partir de incidentes reais."

> "Volta comigo pro 2h13 da manhã, só que num mundo onde a gente fez esse dever de casa.
> O alerta toca, mas já chega com contexto: qual SLO, quanto impacto, qual trace. Eu abro o
> trace, ele me mostra exatamente qual chamada pro provedor de pagamento estourou o tempo.
> Eu filtro os logs pelo mesmo trace ID, verifico a mudança recente e isolo o provedor em
> modo degradado. Em minutos, eu sei o que aconteceu e contenho o impacto.
>
> Mesmas caixinhas no diagrama. Decisões diferentes nas fronteiras. Agora o sistema ajuda
> a equipe a investigar e conter a falha."

Call to action (a frase final, pra ficar ecoando):

> "Da próxima vez que você desenhar uma seta entre duas caixinhas, faça uma pergunta a
> mais antes de fechar o Miro: **'se essa caixa quebrar às 2 da manhã, como é que eu vou
> saber — e como é que eu vou descobrir por quê?'** Se ninguém na sala souber responder,
> a design review não acabou ainda."

---

## Checklist de timing

| Seção | Duração | Acumulado |
|---|---|---|
| 1. Cold open | 3:00 | 3:00 |
| 2. Reframe / tese | 2:30 | 5:30 |
| 3. MELT | 10:00 | 15:30 |
| 4. SLOs e alertas | 9:30 | 25:00 |
| 5. Design para investigabilidade | 3:00 | 28:00 |
| 6. Fechamento | 2:00 | 30:00 |

Buffer: nenhum — 30 min é justo. Se precisar cortar, os candidatos são a seção 4.2
(SLI/SLO/error budget) reduzida a uma frase cada, ou a seção 5 cortada para 2 perguntas em
vez de 4.

## Diagramas referenciados
- `diagrams/01-architecture-pretty.d2` — seção 1
- `diagrams/02-architecture-incident.d2` — seção 1 (opcional, reforço visual do caos)
- `diagrams/04-alert-funnel.d2` — seção 4
- `diagrams/05-architecture-annotated.d2` — seção 5 e fechamento (reaproveitar na seção 6)
