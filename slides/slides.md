---
theme: ./theme
title: Além do diagrama de caixinhas
info: |
  Projetando sistemas que você consegue investigar.
  Codecon Summit 26, 30 min
fonts:
  sans: Space Grotesk
  mono: Space Mono
transition: fade
layout: cover-3d
---

# Além do diagrama<br>de caixinhas

Projetando sistemas que você consegue investigar

<p class="cc-cover-author">Alex Rios</p>

<!--
Cold open começa no próximo slide. Não apresentar a agenda. Entrar direto na história.
-->

---

<div class="cc-intro-grid">
  <div class="cc-intro-portrait">
    <img src="/alex-portrait.png" alt="Retrato ilustrado de Alex Rios com um gato no ombro" />
  </div>
  <div class="cc-intro-copy">
    <p class="cc-intro-kicker">QUEM ESTÁ FALANDO</p>
    <h1>Alex Rios</h1>
    <p class="cc-intro-role">Principal Engineer <span>@Memed</span></p>
    <p class="cc-intro-bio">Autor, palestrante, revisor técnico, mentor, programador e, ultimamente, tendo um caso com <span class="cc-intro-zig"><strong>Zig</strong><img src="/ziggy-ziguana.svg" alt="Ziggy, a Ziguana, mascote do Zig" /></span>.</p>
    <div class="cc-intro-links">
      <a href="https://github.com/alexrios" aria-label="GitHub: alexrios"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .7A11.5 11.5 0 0 0 8.36 23.1c.58.1.79-.25.79-.56v-2.23c-3.23.7-3.91-1.37-3.91-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.77 2.72 1.26 3.38.96.1-.75.4-1.26.74-1.55-2.58-.29-5.29-1.29-5.29-5.74 0-1.27.45-2.3 1.2-3.12-.12-.3-.52-1.48.11-3.08 0 0 .98-.31 3.16 1.19a10.98 10.98 0 0 1 5.75 0c2.19-1.5 3.16-1.19 3.16-1.19.63 1.6.23 2.78.11 3.08.75.82 1.2 1.85 1.2 3.12 0 4.46-2.72 5.44-5.3 5.73.42.36.79 1.06.79 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z"/></svg>/alexrios</a>
      <a href="https://www.linkedin.com/in/the-alex-rios" aria-label="LinkedIn: the-alex-rios"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.32 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.1 20.45H3.54V9H7.1v11.45Z"/></svg>/the-alex-rios</a>
      <a href="https://alexrios.me" aria-label="Site: alexrios.me"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9.5"/><path d="M2.5 12h19M12 2.5c2.35 2.6 3.55 5.77 3.55 9.5S14.35 18.9 12 21.5C9.65 18.9 8.45 15.73 8.45 12S9.65 5.1 12 2.5Z"/></svg>alexrios.me</a>
    </div>
  </div>
</div>

<!--
Apresentação pessoal curta. Não transformar em currículo: nome, contexto e seguir.
-->

---
class: cc-books-slide
---

<div class="cc-books-heading">
  <p>PUBLICADO PELA PACKT</p>
  <h1>Books</h1>
</div>

<div class="cc-books-stage">
  <figure class="cc-book cc-book-go">
    <img src="/book-go.png" alt="Capa do livro System Programming Essentials with Go, de Alex Rios" />
  </figure>
  <figure class="cc-book cc-book-zig">
    <img src="/book-zig.jpg" alt="Capa do livro Learning Zig, de Alex Rios" />
  </figure>
</div>

<img class="cc-books-gopher" src="/gopher-standard.svg" alt="Go Gopher, criado por Renée French" />
<img class="cc-books-ziggy" src="/ziggy-ziguana.svg" alt="Ziggy, a Ziguana" />

<!--
Dois livros de programação de sistemas: um com Go e outro com Zig. Contexto rápido para
explicar de onde vem minha obsessão por entender o que acontece por baixo das abstrações.
-->

---
class: cc-community-slide
---

<div class="cc-community-board">
  <img src="/community-collage.png" alt="Mosaico de palestras, conferências e encontros da comunidade internacional de Go" />
</div>

<!--
Comunidade é a outra parte do contexto: anos apresentando e aprendendo com pessoas em
eventos de vários países. Passar rápido; isto ainda é apresentação, não retrospectiva.
-->

---
class: cc-phone-slide
---

<div class="cc-phone-scene">
  <div class="cc-phone-shadow" aria-hidden="true"></div>
  <div class="cc-phone" role="img" aria-label="Celular Nokia antigo mostrando um alerta do PagerDuty às 02:13">
    <div class="cc-phone-speaker"></div>
    <div class="cc-phone-brand">NOKIA</div>
    <div class="cc-phone-screen">
      <div class="cc-phone-status"><span>02:13</span><span class="cc-phone-signal">▮▮▮</span></div>
      <div class="cc-phone-app">PAGERDUTY</div>
      <div class="cc-phone-message">CHECKOUT<br>ERROR RATE<br><strong>ACIMA DO<br>THRESHOLD</strong></div>
      <div class="cc-phone-screen-footer"><span>ABRIR</span><span>IGNORAR</span></div>
    </div>
    <div class="cc-phone-nav">
      <span></span><span class="cc-phone-nav-main"></span><span></span>
    </div>
    <div class="cc-phone-keypad" aria-hidden="true">
      <span>1</span><span>2<small>ABC</small></span><span>3<small>DEF</small></span>
      <span>4<small>GHI</small></span><span>5<small>JKL</small></span><span>6<small>MNO</small></span>
      <span>7<small>PQRS</small></span><span>8<small>TUV</small></span><span>9<small>WXYZ</small></span>
      <span>*</span><span>0</span><span>#</span>
    </div>
  </div>
  <p class="cc-phone-caption">UMA NOVA MENSAGEM<br><span v-click>e zero contexto 😅</span></p>
</div>

<!--
"2h13 da manhã. O celular vibra em cima da mesa de cabeceira. Eu abro o notebook ainda
no escuro e faço a única coisa que sei fazer: abro o diagrama de arquitetura."
-->

---
layout: image
video: /anim/arch-pretty.mp4
caption: "aprovado na design review, três meses atrás"
---

# Bonito demais para falhar

<!--
"Aquele mesmo que a gente desenhou faz três meses, bonito, com as setinhas certinhas.
E aí eu percebo: esse diagrama não me diz absolutamente nada sobre o que está acontecendo
AGORA. Ele diz como o sistema foi desenhado. Não diz onde ele está doendo."
-->

---
layout: image
video: /anim/arch-incident.mp4?v=4
caption: "o mesmo sistema, durante o incidente"
class: cc-incident-slide
---

# Confuso demais para investigar

<!--
"Abro o log do API Gateway: só um monte de 502. Log do serviço de pagamento: cheio de
timeout, mas timeout de quê? Log da fila: mensagens acumulando. Cada log de um serviço
diferente, cada um com o próprio formato, nenhum com um jeito de saber 'esses três logs
são sobre o mesmo pedido'."
-->

---
class: cc-clue-slide
---

# Fragmentos de log

<div class="cc-clue-board">
  <svg class="cc-clue-route" viewBox="0 0 832 300" aria-hidden="true">
    <path v-click="2" d="M240 72 C276 72 266 170 304 170" />
    <path v-click="3" d="M536 170 C576 170 566 72 600 72" />
  </svg>
  <article v-click="1" class="cc-clue cc-clue-one">
    <span class="cc-clue-index">EVIDÊNCIA 01: provider</span>
    <div class="cc-clue-terminal">
      <small>$ tail provider.log</small>
      <code>latency=<mark>SLOW</mark></code>
      <small>upstream_response_time ↑</small>
    </div>
  </article>
  <article v-click="2" class="cc-clue cc-clue-two">
    <span class="cc-clue-index">EVIDÊNCIA 02: retry-policy</span>
    <div class="cc-clue-terminal">
      <small>$ grep retry policy.log</small>
      <code>attempts=<mark>3</mark></code>
      <small>outbound_traffic ↑</small>
    </div>
  </article>
  <article v-click="3" class="cc-clue cc-clue-three">
    <span class="cc-clue-index">EVIDÊNCIA 03: orders-queue</span>
    <div class="cc-clue-terminal">
      <small>$ watch queue:orders</small>
      <code>backlog=<mark>RISING</mark></code>
      <small>consumer_lag ↑</small>
    </div>
  </article>
</div>

<p v-click="4" class="cc-clue-conclusion">Descobrir essa cadeia levou <del>f*cking</del> <strong>45 minutos.</strong> 😫</p>

<!--
"Quarenta e cinco minutos depois eu finalmente monto o quebra-cabeça."
-->

---
class: cc-phone-slide
---

<div class="cc-phone-scene cc-phone-scene-resolved">
  <div class="cc-phone-shadow" aria-hidden="true"></div>
  <div class="cc-phone" role="img" aria-label="Celular Nokia antigo mostrando uma mensagem do PagerDuty informando que o problema foi resolvido às 02:58">
    <div class="cc-phone-speaker"></div>
    <div class="cc-phone-brand">NOKIA</div>
    <div class="cc-phone-screen">
      <div class="cc-phone-status"><span>02:58</span><span class="cc-phone-signal">▮▮▮</span></div>
      <div class="cc-phone-app">PAGERDUTY</div>
      <div class="cc-phone-message"><strong>RESOLVED ♥</strong><span class="cc-phone-resolved-detail">CHECKOUT<br>ERROR RATE<br>ACIMA DO<br>THRESHOLD</span></div>
      <div class="cc-phone-screen-footer"><span>DETALHES</span><span>FECHAR</span></div>
    </div>
    <div class="cc-phone-nav">
      <span></span><span class="cc-phone-nav-main"></span><span></span>
    </div>
    <div class="cc-phone-keypad" aria-hidden="true">
      <span>1</span><span>2<small>ABC</small></span><span>3<small>DEF</small></span>
      <span>4<small>GHI</small></span><span>5<small>JKL</small></span><span>6<small>MNO</small></span>
      <span>7<small>PQRS</small></span><span>8<small>TUV</small></span><span>9<small>WXYZ</small></span>
      <span>*</span><span>0</span><span>#</span>
    </div>
  </div>
  <div class="cc-phone-resolved-copy">
    <p class="cc-phone-caption">INCIDENTE<br><span>RESOLVIDO 🌞</span></p>
    <div v-click class="cc-phone-verdict-heading">
      <span>LAUDO DA ARQUITETURA // 02:58</span>
      <h1>O sistema passou<br>no teste errado.</h1>
    </div>
  </div>
</div>

<!--
"Quarenta e cinco minutos depois, o celular vibra de novo. Problema resolvido."
-->

---
class: cc-verdict-slide
---

<div class="cc-verdict-scene cc-verdict-scene-sheet-only">
  <div class="cc-verdict-sheet" aria-label="Comparação entre design review e investigação de incidente">
    <section class="cc-verdict-panel cc-verdict-approved">
      <header><span>TESTE 01</span><strong>DESIGN REVIEW</strong></header>
      <div class="cc-verdict-miniarch" aria-hidden="true">
        <i>API</i><b></b><i>PAY</i><b></b><i>DB</i>
      </div>
      <ul>
        <li>caixinhas bem definidas</li>
        <li>setinhas no lugar certo</li>
        <li>arquitetura coerente</li>
      </ul>
      <div v-click="1" class="cc-verdict-stamp cc-verdict-approved-stamp">APROVADO</div>
    </section>
    <section v-click="2" class="cc-verdict-panel cc-verdict-investigation">
      <header><span>TESTE 02</span><strong>INCIDENTE REAL</strong></header>
      <div class="cc-verdict-terminal">
        <p><span>trace_context</span><strong>∅</strong></p>
        <p><span>onde quebrou?</span><strong>???</strong></p>
        <p><span>por quê?</span><strong>???</strong></p>
      </div>
      <div v-click="3" class="cc-verdict-stamp cc-verdict-inconclusive-stamp">INCONCLUSIVO</div>
    </section>
    <div v-click="4" class="cc-verdict-tear" aria-hidden="true"></div>
    <p v-click="4" class="cc-verdict-conclusion">Ninguém projetou o sistema<br><strong>pra ser investigado</strong></p>
  </div>
</div>

---
class: cc-course-slide
---

<div class="cc-course-ad">
  <div class="cc-course-copy">
    <p class="cc-course-kicker">TREINAMENTO INTENSIVO: VAGAS LIMITADAS</p>
    <h1>Incidentes em produção<br><span>sem entrar em pânico</span></h1>
    <p class="cc-course-promise">Aprenda tudo que acabou de passar voando:</p>
    <div class="cc-course-keywords" aria-label="Termos técnicos citados na história">
      <code>502</code><code>timeout</code><code>upstream</code><code>retry</code>
      <code>retry storm</code><code>backlog</code><code>consumer lag</code><code>trace context</code>
    </div>
  </div>

  <aside class="cc-course-offer">
    <span class="cc-course-seal">DO ZERO<br>AO ON-CALL</span>
    <p class="cc-course-label">MÉTODO EXCLUSIVO</p>
    <strong>Produção<br>à prova de<br>madrugada™</strong>
    <UrgencyCountdown />
    <button type="button">QUERO DOMINAR PRODUÇÃO →</button>
    <small>12× de ansiedade recorrente</small>
  </aside>

  <div v-click="1" class="cc-course-reveal">
    <span>QUALQUER SEMELHANÇA É MERA COINCIDÊNCIA.</span>
    <strong>Pânico fabricado faz qualquer lacuna parecer incompetência.</strong>
    <small v-click="2">Se você não sabe tudo, parabéns: você é humano.</small>
  </div>
</div>

<!--
Deixar a plateia sentir a urgência artificial por um instante. No clique: "Esse é o truque:
fabricar pânico e fazer qualquer coisa que você ainda não sabe parecer uma falha sua."
No clique seguinte: "Mas ninguém sabe tudo. Se você não sabe tudo, parabéns: você é humano.
Agora vamos dar nome às coisas, sem pânico."
-->

---
layout: section
transition: slide-left
color: blue
index: "01"
class: cc-question-section
---

<img class="cc-question-section-image" src="/pergunta-errada.png" alt="Dois personagens observando algo com desconfiança" />

<div class="cc-question-section-copy">

# A pergunta errada

"Essa arquitetura faz sentido?"

</div>

<!--
Reframe: nomear o problema central antes de entrar em conceitos técnicos.
-->

---
class: cc-two-questions-slide
---

<div class="cc-two-questions">
  <header>
    <h1>Dois jeitos de olhar o mesmo sistema</h1>
  </header>

  <div class="cc-two-questions-grid">
    <section class="cc-question-card cc-question-review">
      <div class="cc-question-meta"><span>14:00</span><strong>DESIGN REVIEW</strong></div>
      <div class="cc-question-arch" aria-label="API conectada ao serviço de pagamento">
        <i>API</i><b></b><i>PAY</i>
      </div>
      <p>“Essa arquitetura <strong>faz sentido?</strong>”</p>
      <small>valida o desenho</small>
    </section>
    <section v-click="1" class="cc-question-card cc-question-incident">
      <div class="cc-question-meta"><span>02:13</span><strong>INCIDENTE</strong></div>
      <div class="cc-question-arch" aria-label="Conexão quebrada entre API e serviço de pagamento">
        <i>API</i><b></b><i>PAY</i>
      </div>
      <p>“Como eu descubro <strong>o quê, onde e por quê?</strong>”</p>
      <small>valida a investigação</small>
    </section>
  </div>

  <p v-click="2" class="cc-two-questions-conclusion">A segunda pergunta precisa entrar na design review:<br><strong>“Quando isso falhar, como vamos conter, observar e descobrir?”</strong></p>
</div>

---
class: cc-thesis-final-slide
---

<div class="cc-thesis-final">
  <div class="cc-thesis-final-copy">
    <h1>Fazer funcionar é desafio<br><strong>de junior e pleno.</strong> 👀</h1>
    <p class="cc-thesis-final-statement">Quando algo der errado, o sistema precisa conter o impacto e deixar pistas para a gente descobrir <strong>antes do usuário.</strong></p>
  </div>

  <div v-click="1" class="cc-thesis-meme">
    <img src="/tuxedo-mask-work-done.png" alt="Herói mascarado de capa e smoking segurando uma rosa sob a lua" />
    <div class="cc-thesis-meme-copy">
      <blockquote>“My work here<br>is done.”</blockquote>
      <div v-click="2" class="cc-thesis-meme-reply">
        <p>“Mas você ainda nem explicou <strong>como investigar.</strong>”</p>
        <cite>literalmente você pensando agora</cite>
      </div>
    </div>
  </div>
</div>

<!--
Dizer: "Fazer funcionar é só o começo. Engenharia é assumir que alguma coisa vai dar
errado, decidir como essa falha será contida e construir os sinais que nos permitam
descobri-la antes que o usuário precise nos contar. Investigabilidade é como o sistema
participa dessa conversa."

Dizer como se a palestra tivesse acabado. Pausa. No clique, entra o Tuxedo Mask.
Deixar a plateia rir antes de responder: "É. Então vamos dar nome às coisas."
-->

---
layout: section
transition: slide-left
color: blue
index: "02"
class: cc-melt-section
---

# MELT 🫠

o vocabulário da investigabilidade

---
class: cc-melt-scene cc-metric-scene
---

# Metric

<p class="cc-melt-kicker">M / MEDIDA AGREGADA AO LONGO DO TEMPO</p>

<div class="cc-metric-composition">
  <div class="cc-metric-readout">
    <span>NO DASHBOARD</span>
    <strong>12%</strong>
    <p>dos checkouts falhando</p>
    <code>checkout_error_rate</code>
  </div>
  <div class="cc-metric-chart" aria-label="Taxa de erro do checkout subindo de zero para doze por cento entre 02:05 e 02:13">
    <svg viewBox="0 0 620 220" role="img">
      <path class="cc-metric-gridline" d="M24 42H596 M24 102H596 M24 162H596" />
      <path class="cc-metric-threshold" d="M24 102H596" />
      <path class="cc-metric-area" d="M24 174 L108 171 L192 168 L276 161 L332 151 L374 116 L416 79 L458 54 L512 39 L596 32 L596 190 L24 190 Z" />
      <path class="cc-metric-line" d="M24 174 L108 171 L192 168 L276 161 L332 151 L374 116 L416 79 L458 54 L512 39 L596 32" />
      <circle cx="596" cy="32" r="7" />
      <text x="580" y="20">12%</text>
      <text x="500" y="94">threshold</text>
    </svg>
    <div><span>02:05</span><span>02:13</span></div>
  </div>
</div>

<div class="cc-melt-answerline">
  <div v-click="1" class="cc-melt-answer cc-melt-answer-yes">
    <span>RESPONDE</span>
    <b>Quanto? Com que frequência? Desde quando?</b>
  </div>
  <div v-click="2" class="cc-melt-answer cc-melt-answer-no">
    <span>NÃO RESPONDE</span>
    <b>Qual pedido falhou?</b>
  </div>
</div>

<!--
Metric é uma medida agregada ao longo do tempo. Mostra escala, tendência e impacto, mas
troca detalhe individual por agregação. Ela diz que temos um problema; não localiza uma
requisição específica.
-->

---
class: cc-melt-scene cc-event-scene
---

# Event

<p class="cc-melt-kicker">E / FATO DISCRETO REGISTRADO NO TEMPO</p>

<div class="cc-event-question">O que mudou?</div>

<div class="cc-event-timeline">
  <div class="cc-event-axis"></div>
  <div class="cc-event-tick cc-event-deploy">
    <time>02:08</time><i></i>
    <strong>DEPLOY</strong>
    <code>payment-service v2.8.1</code>
  </div>
  <div class="cc-event-tick cc-event-alert">
    <time>02:13</time><i></i>
    <strong>ALERTA</strong>
    <span>checkout_error_rate = 12%</span>
  </div>
</div>

<p class="cc-event-verdict"><strong>5 minutos de distância.</strong> Uma pista, ainda não uma causa.</p>
<div class="cc-event-examples"><span>deploy</span><span>feature flag</span><span>config</span><span>circuit breaker</span></div>

<!--
Event é um fato discreto, não uma linha de texto qualquer: deploy realizado, flag ativada,
circuit breaker aberto. Ele cria a trilha do que mudou, mas proximidade temporal ainda não
é causalidade.
-->

<!--
- **Event:** a foto de quando trocaram a fiação na semana passada

-->

---
class: cc-melt-scene cc-trace-scene
---

# Trace

<p class="cc-melt-kicker">T / CAMINHO DE UMA OPERAÇÃO ENTRE SERVIÇOS</p>

<div class="cc-trace-evidence">
  <img src="/trace-waterfall.png" alt="Waterfall de um trace distribuído com cinco spans e latência concentrada no provedor externo" />
</div>

<div class="cc-melt-answerline cc-trace-answerline">
  <div v-click="1" class="cc-melt-answer cc-melt-answer-yes">
    <span>RESPONDE</span>
    <b>Por onde esta operação passou? Quanto tempo gastou?</b>
  </div>
  <div v-click="2" class="cc-melt-answer cc-melt-answer-no">
    <span>NÃO RESPONDE</span>
    <b>Quantas operações foram afetadas? O que mudou?</b>
  </div>
</div>

<!--
Um trace acompanha uma operação através das fronteiras do sistema. Aqui vemos gateway,
fila, pagamento, banco e provedor externo. O span vermelho localiza os 2250 ms, mas um
único trace não diz quantos usuários foram afetados nem qual mudança recente pode explicar a falha.
-->

---
class: cc-melt-scene cc-log-scene
---

# Log

<p class="cc-melt-kicker">L / REGISTRO LOCAL PRODUZIDO PELO CÓDIGO</p>

<div class="cc-log-evidence">
  <div class="cc-log-command">$ logs payment --at 02:13:41 --format structured</div>
  <div class="cc-log-record">
    <span class="cc-log-record-time">02:13:41.902</span>
    <p><em>service</em>=payment</p>
    <p><em>error</em>=<mark>context_deadline_exceeded</mark></p>
    <p><em>attempt</em>=3</p>
    <p><em>trace_id</em>=<strong>4f2a91c0e7b39c1e</strong></p>
  </div>
</div>

<div class="cc-melt-answerline cc-log-answerline">
  <div v-click="1" class="cc-melt-answer cc-melt-answer-yes">
    <span>RESPONDE</span>
    <b>O que este componente observou?</b>
    <small>erro / tentativa / operação / contexto local</small>
  </div>
  <div v-click="2" class="cc-melt-answer cc-melt-answer-no">
    <span>NÃO RESPONDE</span>
    <b>Por onde a operação passou? Qual foi o impacto?</b>
  </div>
</div>

<!--
Log é a narrativa local produzida pelo código. Campos estruturados permitem consultar e
agrupar; texto livre apenas transfere o trabalho para quem está de plantão.
-->

---
class: cc-signal-map-slide
---

# Uma pergunta por sinal

<p class="cc-signal-map-intro">Cada sinal reduz uma incerteza diferente.</p>

<div class="cc-signal-map">
  <article class="cc-signal-map-metric">
    <strong><i>M</i> Metric</strong>
    <p>Qual é o tamanho do problema?</p>
    <div><small>DEIXA EM ABERTO</small><b>qual operação falhou</b></div>
  </article>
  <article class="cc-signal-map-event">
    <strong><i>E</i> Event</strong>
    <p>O que mudou?</p>
    <div><small>DEIXA EM ABERTO</small><b>se a mudança foi a causa</b></div>
  </article>
  <article class="cc-signal-map-trace">
    <strong><i>T</i> Trace</strong>
    <p>Por onde esta operação passou?</p>
    <div><small>DEIXA EM ABERTO</small><b>a escala e as mudanças recentes</b></div>
  </article>
  <article class="cc-signal-map-log">
    <strong><i>L</i> Log</strong>
    <p>O que este componente observou?</p>
    <div><small>DEIXA EM ABERTO</small><b>o caminho e o impacto global</b></div>
  </article>
</div>

<p class="cc-signal-map-bridge">A investigação avança quando uma resposta vira a próxima pergunta.</p>

<!--
A ordem MELT ajuda a memorizar o vocabulário; não é uma receita de investigação. Dependendo
do incidente, posso começar por qualquer sinal e pivotar várias vezes entre eles.
-->

---
class: cc-pivot-journey-slide
---

# Investigar é saber se adaptar

<p class="cc-pivot-journey-intro">Uma resposta precisa abrir a próxima consulta.</p>

<div class="cc-pivot-journey">
  <article class="cc-pivot-stop cc-pivot-stop-metric">
    <span>METRIC</span>
    <strong>12% falhando</strong>
    <code>02:05 → 02:13</code>
    <small>JANELA + IMPACTO</small>
  </article>

  <div v-click="1" class="cc-pivot-hop">
    <small>exemplar<br>ou deep link</small><i>→</i>
  </div>

  <article v-click="1" class="cc-pivot-stop cc-pivot-stop-trace">
    <span>TRACE</span>
    <strong>span payment</strong>
    <code>4f2a91…</code>
    <small>CAMINHO + LATÊNCIA</small>
  </article>

  <div v-click="2" class="cc-pivot-hop">
    <small>trace_id<br>+ service</small><i>→</i>
  </div>

  <article v-click="2" class="cc-pivot-stop cc-pivot-stop-log">
    <span>LOG</span>
    <strong>deadline exceeded</strong>
    <code>payment</code>
    <small>CONTEXTO LOCAL</small>
  </article>

  <div v-click="3" class="cc-pivot-hop">
    <small>tempo + serviço<br>+ versão</small><i>→</i>
  </div>

  <article v-click="3" class="cc-pivot-stop cc-pivot-stop-event">
    <span>EVENT</span>
    <strong>deploy v2.8.1</strong>
    <code>02:08</code>
    <small>MUDANÇA RECENTE</small>
  </article>
</div>

<p v-click="4" class="cc-pivot-journey-conclusion">Investigar é conseguir ir de um sinal ao próximo sem perder o contexto.</p>

<!--
O problema do incidente não era falta absoluta de dados. Era não conseguir transformar a
saída de uma pergunta na entrada da próxima. Esses pivôs precisam ser projetados.
-->

---
class: cc-correlation-slide
---

# Ter um trace ID não basta

<div class="cc-correlation-grid">
  <div class="cc-id-log">
    <div><span>api-gateway</span><p>POST /checkout → 502</p><code>4f2a91…</code></div>
    <div><span>pagamento</span><p>charge timeout 2250ms</p><code>4f2a91…</code></div>
    <div><span>fila-pedidos</span><p>retry 3/3 esgotado</p><code>4f2a91…</code></div>
  </div>
  <div class="cc-id-requirements">
    <div><b>01</b><p>propagado entre serviços</p></div>
    <div><b>02</b><p>preservado em filas e retries</p></div>
    <div><b>03</b><p>registrado como campo estruturado</p></div>
    <div><b>04</b><p>indexado e pesquisável</p></div>
    <div><b>05</b><p>integrado a alertas e deep links</p></div>
  </div>
</div>

<p class="cc-correlation-conclusion">O ID só vira mecanismo de investigação quando as ferramentas conseguem usá-lo.</p>

<!--
Gerar o ID é o começo. Se ele morre no enqueue, muda no retry, aparece só dentro de uma
mensagem de texto ou não está indexado, continua impossível seguir a história.
-->

---
layout: quote
---

Trace context é decisão de arquitetura.<br><br>Se ele não atravessa a fila e não sobrevive ao retry, a história morre na setinha que você desenhou.

---
layout: section
transition: slide-left
color: pink
index: "03"
---

<h1>Alertas <span v-click="1">que ajudam</span></h1>

<p>SLOs e alertas <span v-click="1">acionáveis</span></p>

---
class: cc-alert-language-slide
---

<div class="cc-alert-language">
  <header>
    <span>REGRA 01&nbsp;&nbsp; MONITORE PARA QUEM USA</span>
    <div v-click class="cc-news-flash">
      <strong>NEWS FLASH!</strong>
      <h1>O usuário não sabe que o banco existe.</h1>
    </div>
  </header>
  <div class="cc-alert-language-stage">
    <section class="cc-alert-causes">
      <div class="cc-alert-language-label">CONTEXTO&nbsp;&nbsp; o que pode explicar</div>
      <div class="cc-alert-cause-stack">
        <article><code>host.cpu</code><strong>85%</strong><small>pode ter capacidade sobrando</small></article>
        <article><code>db.node</code><strong>DOWN</strong><small>o failover pode ter funcionado</small></article>
        <article><code>queue.depth</code><strong>↑ 4×</strong><small>o consumidor pode recuperar</small></article>
      </div>
    </section>
    <div class="cc-alert-language-break" aria-hidden="true"><span>≠</span><small>impacto</small></div>
    <section class="cc-alert-symptom">
      <div class="cc-alert-language-label">RESULTADO&nbsp;&nbsp; o que o usuário sentiu</div>
      <div class="cc-alert-browser">
        <div class="cc-alert-browser-bar"><span></span><span></span><span></span><code>checkout</code></div>
        <div class="cc-alert-browser-body">
          <small>PEDIDO #4815</small>
          <strong>Não foi possível<br>finalizar a compra.</strong>
          <button>tentar novamente</button>
        </div>
      </div>
      <div v-click="2" class="cc-user-monitor">
        <strong>ALERTE SOBRE O RESULTADO</strong>
        <article><code>checkout_success_rate</code><small>conseguiu concluir?</small></article>
        <article><code>checkout_latency</code><small>quanto precisou esperar?</small></article>
      </div>
    </section>
  </div>
</div>

<!--
"O usuário não sabe que o banco existe. Ele sabe que o checkout falhou. CPU, nó e fila
são causas possíveis. Failover e retry podem absorver tudo isso sem impacto. O acionamento
deve nascer no sintoma, no ponto mais próximo possível da experiência do usuário."

Exceção: vale alertar em causa quando ela prevê um problema inevitável antes de existir
um sintoma, como disco ou quota que acaba em poucas horas.
-->

---
class: cc-slo-instrument-slide
---

<div class="cc-slo-instrument" :class="{ 'cc-slo-stepping': $clicks > 0 }">
  <header>
    <span>REGRA 02&nbsp;&nbsp; DÊ CONTEXTO AO NÚMERO</span>
    <h1>Uma métrica. Um limite. Uma margem.</h1>
  </header>
  <div class="cc-slo-console">
    <section class="cc-slo-reading">
      <div class="cc-slo-console-head"><span>CHECKOUT_SUCCESS</span></div>
      <strong>99,2<small>%</small></strong>
      <p>SLI <span>o que está acontecendo</span></p>
      <div class="cc-slo-track">
        <i class="cc-slo-track-fill"></i>
        <b class="cc-slo-target"><span>SLO 99,5%</span></b>
      </div>
      <div class="cc-slo-scale"><span>98%</span><span>99%</span><span>100%</span></div>
    </section>
    <section class="cc-slo-legend">
      <article class="cc-slo-sli-row" :class="{ 'cc-slo-active': $clicks === 1 }"><span>01</span><div><strong>SLI</strong><p>mede a experiência real</p></div><code>99,2%</code></article>
      <article class="cc-slo-slo-row" :class="{ 'cc-slo-active': $clicks === 2 }"><span>02</span><div><strong>SLO</strong><p>define o aceitável</p></div><code>≥ 99,5%</code></article>
      <article class="cc-slo-budget-row" :class="{ 'cc-slo-active': $clicks === 3 }"><span>03</span><div><strong>ERROR BUDGET</strong><p>é a margem para falhar</p></div><code>0,5%</code></article>
    </section>
  </div>
  <div class="cc-slo-verdict-stage">
    <p v-click="[1, 2]" class="cc-slo-verdict cc-slo-verdict-sli"><span>SLI</span> Em 1.000 checkouts, <strong>992 foram concluídos.</strong></p>
    <p v-click="[2, 3]" class="cc-slo-verdict cc-slo-verdict-slo"><span>SLO</span> O compromisso era concluir <strong>pelo menos 995.</strong></p>
    <p v-click="3" class="cc-slo-verdict cc-slo-verdict-budget"><span>ERROR BUDGET</span> A margem era 5 falhas. <strong>Aconteceram 8.</strong></p>
  </div>
</div>

<!--
O ponto: error budget dá PRIORIDADE ao alerta. Sem ele, todo alerta grita igual.
O burn rate quantifica essa prioridade: compara a velocidade atual de consumo com a
velocidade que esgotaria o budget exatamente no fim da janela.
-->

---
class: cc-page-gate-slide
---

<div class="cc-page-gate">
  <header>
    <span>REGRA 03&nbsp;&nbsp; PROTEJA A ATENÇÃO HUMANA</span>
    <h1>Nem todo alerta merece uma madrugada.</h1>
  </header>
  <div class="cc-attention-routing">
    <section class="cc-attention-question">
      <span>O CRITÉRIO</span>
      <strong>Uma pessoa precisa agir?</strong>
      <p>Se precisa, quando?</p>
    </section>
    <section class="cc-attention-options" aria-label="Destino conforme o prazo da ação humana">
      <article v-click="1" class="cc-attention-observe">
        <span>NÃO</span><strong>NÃO INTERROMPA</strong><p>dashboard, log ou remova a regra</p>
      </article>
      <article v-click="2" class="cc-attention-ticket">
        <span>SIM, MAS PODE ESPERAR</span><strong>TICKET</strong><p>ação assíncrona, com dono e prazo</p>
      </article>
      <article v-click="3" class="cc-attention-page">
        <span>SIM, AGORA</span><strong>ACIONE O<br>PLANTONISTA</strong><p>interrompa quem está de plantão</p>
      </article>
    </section>
  </div>
  <p class="cc-page-gate-warning">O canal segue o prazo da ação, não o susto do gráfico.</p>
</div>

<!--
"Cada acionamento compra uma interrupção humana cara. A primeira pergunta é se existe uma
ação humana útil. A segunda é quando ela precisa acontecer. Agora aciona o plantonista; depois
vira ticket com dono e prazo; sem ação vira dashboard, log ou remoção da regra."

"Se a resposta recorrente é 'olhei e não era nada', refine, rebaixe ou remova a regra."
-->

---
class: cc-phone-slide
---

<div class="cc-phone-scene cc-phone-scene-actionable">
  <div class="cc-phone-shadow" aria-hidden="true"></div>
  <div class="cc-phone" role="img" aria-label="Celular Nokia antigo mostrando um acionamento do checkout às 02:13">
    <div class="cc-phone-speaker"></div>
    <div class="cc-phone-brand">NOKIA</div>
    <div class="cc-phone-screen">
      <div class="cc-phone-status"><span>02:13</span><span class="cc-phone-signal">▮▮▮</span></div>
      <div class="cc-phone-app">PAGERDUTY</div>
      <div class="cc-phone-message cc-phone-actionable-message">
        <strong>CHECKOUT FALHANDO</strong>
        <span>12% AFETADOS</span>
        <span>ERROR BUDGET: 4H</span>
        <span>TRACE VINCULADO</span>
      </div>
      <div class="cc-phone-screen-footer"><span>ABRIR TRACE</span><span>CONFIRMAR</span></div>
    </div>
    <div class="cc-phone-nav">
      <span></span><span class="cc-phone-nav-main"></span><span></span>
    </div>
    <div class="cc-phone-keypad" aria-hidden="true">
      <span>1</span><span>2<small>ABC</small></span><span>3<small>DEF</small></span>
      <span>4<small>GHI</small></span><span>5<small>JKL</small></span><span>6<small>MNO</small></span>
      <span>7<small>PQRS</small></span><span>8<small>TUV</small></span><span>9<small>WXYZ</small></span>
      <span>*</span><span>0</span><span>#</span>
    </div>
  </div>
  <div class="cc-phone-actionable-copy">
    <span>A MESMA MADRUGADA</span>
    <h1>Agora eu sei<br>por que acordei.</h1>
    <p>E por onde começar.</p>
  </div>
</div>

<!--
"O mesmo Nokia, a mesma madrugada. Só que agora o acionamento explica o impacto, mostra a
urgência e já aponta o primeiro passo. A interrupção humana finalmente compra contexto."
-->

---
class: cc-failure-rehearsal-slide
---

<div class="cc-failure-rehearsal" :class="`cc-rehearsal-step-${$clicks}`">
  <div class="cc-rehearsal-clicks" aria-hidden="true">
    <span v-click="1"></span><span v-click="2"></span><span v-click="3"></span><span v-click="4"></span>
  </div>
  <header>
    <span>ANTES DE APROVAR O DESENHO</span>
    <h1>Ensaie a falha <span>(Premortem)</span></h1>
    <p>Escolha uma seta. Imagine que ela parou.</p>
  </header>
  <div class="cc-rehearsal-prompt">
    <div v-if="$clicks === 0" class="cc-rehearsal-prompt-idle">
      <span>HAPPY PATH</span>
      <strong>pedido → pagamento → sucesso</strong>
    </div>
    <div v-else-if="$clicks === 1" class="cc-rehearsal-prompt-observe">
      <span>01&nbsp;&nbsp; OBSERVAR</span>
      <strong>Como o usuário denuncia a falha?</strong>
      <code>checkout_success ↓</code>
    </div>
    <div v-else-if="$clicks === 2" class="cc-rehearsal-prompt-discover">
      <span>02&nbsp;&nbsp; DESCOBRIR</span>
      <strong>Consigo seguir o pedido até aqui?</strong>
      <code>trace_id=4f2a91…</code>
    </div>
    <div v-else-if="$clicks === 3" class="cc-rehearsal-prompt-contain">
      <span>03&nbsp;&nbsp; CONTER</span>
      <strong>Como reduzimos o impacto sem esperar a correção?</strong>
      <code>modo degradado</code>
    </div>
    <div v-else class="cc-rehearsal-prompt-final">
      <span>DESIGN REVIEW</span>
      <strong>Se ninguém sabe responder, o design ainda não terminou.</strong>
    </div>
  </div>
  <div class="cc-review-architecture" role="img" aria-label="Fluxo do checkout entre cliente, API, fila, pagamento e provedor externo">
    <div class="cc-review-node cc-review-client"><small>01</small><strong>CLIENTE</strong></div>
    <div class="cc-review-link cc-review-link-1"><span>HTTP</span><i>→</i></div>
    <div class="cc-review-node cc-review-api"><small>02</small><strong>API</strong></div>
    <div class="cc-review-link cc-review-link-2"><span>pedido</span><i>→</i></div>
    <div class="cc-review-node cc-review-queue"><small>03</small><strong>FILA</strong></div>
    <div class="cc-review-link cc-review-link-3"><span>consume</span><i>→</i></div>
    <div class="cc-review-node cc-review-payment"><small>04</small><strong>PAGAMENTO</strong></div>
    <div class="cc-review-link cc-review-link-4"><span>charge</span><i>→</i></div>
    <div class="cc-review-node cc-review-provider"><small>05</small><strong>PROVEDOR</strong></div>
    <div class="cc-review-failure-mark" aria-hidden="true">×</div>
    <div class="cc-review-trace-label">trace_id=4f2a91…</div>
    <div class="cc-review-fallback">MODO DEGRADADO <span>→ preservar o checkout</span></div>
  </div>
</div>

<!--
"Não precisamos inventar outro artefato. Pegamos o mesmo desenho e ensaiamos a falha:
como ela aparece para o usuário, como seguimos a operação e como reduzimos o impacto."
-->

---
class: cc-final-statement-slide
---

<blockquote>
  <p>“Se ninguém sabe responder, o design ainda não terminou.”</p>
  <cite>Alex Rios</cite>
</blockquote>

---
layout: cover
class: cc-thanks-clean
---

<div class="cc-thanks">
  <div class="cc-thanks-copy">
    <h1>Obrigado</h1>
    <p>Alex Rios</p>
  </div>
  <a class="cc-thanks-qr" href="https://alexrios.me" target="_blank" rel="noopener noreferrer">
    <img src="/alexrios-me-qr.svg" alt="QR code para acessar alexrios.me">
    <span>alexrios.me</span>
  </a>
</div>

<!--
Fim. Espaço pra perguntas se sobrar tempo (não vai sobrar; 30 min é justo).
-->
