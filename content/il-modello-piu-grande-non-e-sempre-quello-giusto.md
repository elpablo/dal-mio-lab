---
title: "Il modello più grande non è sempre quello giusto"
number: 2
date: "2026-08-17"
excerpt: "Quando abbiamo iniziato a far lavorare insieme più agenti AI locali, abbiamo scoperto che il problema non era scegliere il modello più potente. Era progettare il sistema."
tags:
  - AI
  - Local LLM
  - Software Engineering
socialImage: "/og-article-2.png"
---

# Dal mio Lab #2 — Il modello più grande non è sempre quello giusto

Quando si lavora con modelli AI locali, c'è una tentazione abbastanza naturale.

Hai un modello più grande e più capace?

Usalo.

Se poi devi costruire un sistema con diversi agenti, la tentazione diventa ancora più forte:

**metti il modello migliore dappertutto e lascia che faccia il suo lavoro.**

Sembrava ragionevole anche a noi.

Finché non abbiamo provato davvero. 😄

## Un piccolo Council di specialisti

Il progetto su cui stavamo lavorando si chiama **Council**.

L'idea è semplice: invece di chiedere a un singolo modello di analizzare un problema da tutti i punti di vista, assegniamo ruoli diversi a diversi agenti.

Nel test che racconto qui, il Council doveva suggerire una strategia di crescita per CalcolaFacile.

C'erano sei specialisti:

- SEO Strategist
- Growth Marketer
- Product Manager
- UX Expert
- Monetization Analyst
- Contrarian

Alla fine un settimo modello, il **Judge**, riceveva le loro analisi e produceva una sintesi finale.

In pratica, una piccola riunione.

Con il vantaggio che nessuno poteva dire:

> “Scusate, devo entrare in un'altra call.”

😄

## Le prime prove: spingiamo un po'

All'inizio facevamo i test direttamente sul MacBook.

Avevamo più memoria disponibile e potevamo permetterci configurazioni piuttosto pesanti.

In uno dei primi run abbiamo assegnato **Qwen 35B-A3B a tutti i ruoli**, Judge compreso.

Il Council completò il run.

Tecnicamente.

Guardando però i risultati, cinque dei sei specialisti avevano terminato con:

`finishReason: length`

Il run aveva richiesto circa **11 minuti e 37 secondi** e consumato complessivamente **35.933 token**.

Quindi il sistema produceva una decisione finale, ma buona parte degli agenti arrivava al limite dell'output prima di avere davvero concluso il proprio lavoro.

Non era un crash.

Forse era peggio.

Sembrava funzionare.

Un ottimo risultato, se l'obiettivo fosse stato scaldare il MacBook. 😄

## Secondo tentativo: stessi muscoli, stessi problemi

Facemmo un altro run mantenendo sostanzialmente lo stesso approccio.

Sempre Qwen 35B-A3B.

Questa volta il consumo totale scese a **24.443 token** e la durata fu di circa **10 minuti e 58 secondi**.

Ma due specialisti — UX Expert e Monetization Analyst — non produssero proprio una risposta utilizzabile: furono troncati prima del completamento.

Avevamo ridotto qualcosa.

Non avevamo risolto il problema.

## Allora facciamoli parlare meno

A quel punto provammo una soluzione apparentemente logica.

Se il problema era che i modelli generavano troppo, limitiamo l'output.

`maxTokens = 1800`

Il consumo complessivo scese a **18.830 token**.

E il run divenne molto più rapido: circa **4 minuti e 34 secondi**.

Fantastico.

Peccato che cinque specialisti su sei fallirono per `length`.

Sopravvisse soltanto il Contrarian.

Il Council questa volta fu almeno abbastanza onesto da dichiararsi:

`isReliable: false`

Avevamo ottimizzato perfettamente il consumo di token.

Avevamo anche quasi eliminato il sistema che avrebbe dovuto consumarli. 😂

Ed è stato probabilmente il momento più utile dell'esperimento.

Perché il problema non era:

> “I modelli stanno parlando troppo.”

Era più vicino a:

> **“Stiamo usando il modello sbagliato per il lavoro che gli stiamo chiedendo.”**

## Poi è cambiato anche il contesto

Nel frattempo avevamo preso un'altra decisione.

Il Mac mini M4 che avevamo in casa non doveva essere soltanto una macchina per fare test.

L'idea era farlo diventare una sorta di **piccolo cervello sempre acceso dell'abitazione**.

Un nodo AI locale.

Sul Mini girava Ollama.

I modelli potevano essere raggiunti dalla rete locale e, quando serviva, anche da remoto tramite Tailscale.

Il Council poteva quindi continuare a girare sul MacBook, mentre l'inferenza veniva eseguita sul Mini.

Il setup era questo:

- Mac mini M4
- 24 GB di memoria unificata
- Ollama
- modelli accessibili via rete
- Council eseguito dal MacBook

Ed è lì che il problema è diventato molto più interessante.

Perché 24 GB di memoria unificata sono parecchi per un computer così piccolo.

Ma non sono infiniti.

E soprattutto c'è una grande differenza tra:

> “Faccio una domanda a un modello.”

e:

> “Ho sei agenti che devono lavorare, più un Judge che deve sintetizzare tutto.”

A quel punto non stai più scegliendo soltanto un modello.

**Stai progettando un sistema.**

## Cambiare domanda

Fino a quel momento ci stavamo chiedendo:

> Qual è il modello migliore che possiamo usare?

Abbiamo iniziato invece a chiederci:

> **Di quale modello ha realmente bisogno ciascun ruolo?**

Un SEO Strategist deve necessariamente usare lo stesso modello del Judge?

Un UX Expert ha davvero bisogno dello stesso budget computazionale di chi deve sintetizzare sei analisi?

E soprattutto:

ha senso mettere sei istanze pesanti in competizione per le stesse risorse solo perché possiamo farlo?

La risposta, nel nostro caso, è stata no.

Abbiamo quindi cambiato strategia.

I sei specialisti sono passati a **Gemma 3 12B**.

Il Judge è rimasto separato, usando **Qwen 3 14B**.

E abbiamo iniziato a trattare seriamente un altro parametro:

**il parallelismo.**

## Sei agenti non devono per forza lavorare tutti insieme

Il Council aveva sei specialisti pronti a partire.

Questo non significava che dovessero partire tutti contemporaneamente.

Sembra banale.

Ma quando costruisci sistemi multi-agent è facile pensare:

> Più parallelismo = meno tempo.

Finché hai risorse abbondanti, spesso è vero.

Quando però più modelli locali iniziano a contendersi memoria, GPU e capacità di inferenza, il risultato può essere esattamente l'opposto.

Più richieste contemporanee.

Più pressione sulle risorse.

Più errori.

Più `fetch failed`.

Meno affidabilità.

Abbiamo quindi reso configurabile il livello di parallelismo e lo abbiamo portato a:

`2`

Non sei agenti contemporaneamente.

Due.

## Il risultato

Il run successivo ha prodotto:

- 6 specialisti completati su 6
- 0 failure
- 0 truncation
- tutti i ruoli terminati con `finishReason: stop`
- **8.940 token complessivi**
- circa **7 minuti e 21 secondi** di esecuzione
- concurrency configurata a **2**

Mettendo affiancati alcuni run:

| Configurazione | Token totali | Durata | Risultato |
|---|---:|---:|---|
| Qwen 35B-A3B su tutti i ruoli | 35.933 | 11m 37s | 5 ruoli terminati per `length` |
| Qwen 35B-A3B | 24.443 | 10m 58s | 2 ruoli falliti |
| Qwen 35B-A3B con output limitato | 18.830 | 4m 34s | 5 ruoli falliti, Council non affidabile |
| Gemma 3 12B + Qwen 3 14B Judge, concurrency 2 | **8.940** | **7m 21s** | **6/6 completati, nessun errore** |

Tra il primo run e quello stabile, il consumo complessivo di token è diminuito di circa il **75%**.

Anche il tempo totale è sceso sensibilmente.

Ma questi due numeri, in realtà, non sono la parte più importante.

La differenza vera è questa:

**prima il sistema produceva molte risposte troncate o fallite. Dopo, tutti i ruoli terminavano correttamente.**

## Attenzione: non è un benchmark

Qui è importante chiarire una cosa.

Questi numeri **non dimostrano che Gemma 3 12B sia migliore di Qwen 35B-A3B**.

Non era quello che stavamo misurando.

Non abbiamo eseguito gli stessi test sullo stesso hardware in condizioni controllate.

Anzi, le prime prove più pesanti erano state fatte direttamente sul MacBook, mentre successivamente abbiamo spostato stabilmente l'inferenza sul Mac mini.

Quindi non avrebbe alcun senso leggere questa storia come:

> “Gemma batte Qwen.”

Il problema che stavamo cercando di risolvere era diverso:

> **Come facciamo a far lavorare insieme diversi agenti AI, su un nodo locale relativamente piccolo, in maniera affidabile?**

Nel nostro caso la risposta non è stata:

**più modello.**

È stata:

**il modello giusto nel posto giusto.**

## Il Mac mini da 24 GB basta?

Questa è probabilmente la domanda che mi sarei fatto anch'io leggendo tutto questo prima di iniziare.

La risposta che darei oggi è:

**dipende da cosa vuoi costruire.**

Un Mac mini M4 con 24 GB di memoria unificata può già essere una macchina molto interessante per LLM locali.

Può diventare un piccolo nodo AI sempre acceso.

Può servire modelli sulla rete.

Può essere raggiunto da più dispositivi.

Può fare parecchio.

Ma appena passi da un singolo modello a un sistema multi-agent, cambiano completamente le domande che devi porti.

Non basta più chiedersi:

> Il modello entra in memoria?

Devi iniziare a ragionare anche su:

- dimensione dei modelli;
- context window;
- output massimo;
- numero di agenti;
- parallelismo;
- ruolo assegnato a ciascun modello;
- pressione sulle risorse;
- comportamento in caso di errore;
- retry;
- affidabilità complessiva.

È lì che il problema smette di essere:

**“quale modello installo?”**

e diventa:

**“come progetto il sistema?”**

## Il modello migliore non esiste

O meglio.

Probabilmente esiste un modello migliore per un determinato benchmark.

Ma quando costruisci qualcosa di reale, la domanda utile è un'altra:

> **Qual è il modello più piccolo che riesce a svolgere bene quel particolare ruolo?**

Per alcuni compiti potresti avere bisogno di molta capacità.

Per altri no.

Usare la stessa quantità di risorse per tutto non rende necessariamente il sistema migliore.

Può semplicemente renderlo più costoso.

Più lento.

E meno affidabile.

Nel nostro Council abbiamo iniziato cercando di dare a tutti il modello più capace che potevamo permetterci.

Abbiamo ottenuto un sistema migliore quando abbiamo smesso di farlo.

E anche quando abbiamo smesso di far lavorare tutti contemporaneamente.

Alla fine, la lezione più importante non è stata:

> Gemma usa meno risorse.

Né:

> Qwen è troppo grande.

È stata questa:

**non stavamo ottimizzando un modello; stavamo progettando un sistema.**

E quando le risorse sono limitate, l'ottimizzazione più efficace non consiste sempre nel far fare meno lavoro all'AI.

A volte consiste nel capire:

**quale AI deve fare quel lavoro.**

E quanti colleghi far entrare contemporaneamente nel Lab. 😄
