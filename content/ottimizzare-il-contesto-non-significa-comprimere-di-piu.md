---
title: "Ottimizzare il contesto non significa comprimere di più"
number: 5
excerpt: "Quando una metrica di ottimizzazione peggiora, non significa necessariamente che il sistema stia funzionando peggio. A volte succede esattamente il contrario."
tags:
  - AI
  - AI Agents
  - Software Engineering
socialImage: "/og-article-5.png"
discussion:
  title: "Come la state affrontando voi?"
  paragraphs:
    - "Quando ottimizzate il contesto dei vostri agenti, quali metriche guardate davvero?"
    - "Compressione?"
    - "Cache hit?"
    - "Costo?"
    - "Latenza?"
    - "Qualità del risultato?"
    - "E soprattutto: vi è mai capitato che migliorare una singola metrica peggiorasse il sistema nel suo complesso?"
  linkedinPost: https://lnkd.in/p/dzTq-ETG
---

# Dal mio Lab #5 <br class="mobile-title-break">— Ottimizzare il contesto non significa comprimere di più

Quando lavori con agenti di coding abbastanza a lungo, prima o poi inizi a guardare i token come si guarda il consumo della macchina dopo aver visto accendersi la spia della riserva.

All’inizio non ci fai troppo caso.

Poi il repository cresce.

Le conversazioni diventano più lunghe.

Gli strumenti restituiscono file, log, JSON, risultati di ricerca.

L’agente continua a lavorare bene, ma ogni nuova richiesta si porta dietro una quantità crescente di contesto.

E la domanda arriva abbastanza naturalmente:

**quanto di tutto questo stiamo realmente usando?**

Nel Lab stavamo già usando **Graphify** per aiutare gli agenti a comprendere e navigare repository complessi.

Poi abbiamo iniziato a sperimentare con **Headroom**, uno strumento pensato per ridurre il contesto inviato al modello comprimendo output, file, log e altre informazioni prima che entrino nel prompt.

L’idea sembrava semplice:

> meno contesto inutile → meno token → meno costo e più spazio per ciò che conta davvero.

E in uno dei primi esperimenti sembrava funzionare esattamente così.

## Tre strumenti, tre ruoli diversi

Prima di guardare i numeri, è importante chiarire una cosa.

Graphify, Headroom e Serena non fanno esattamente lo stesso lavoro.

In modo molto semplificato:

**Graphify riduce il costo di capire dove guardare.**

Aiuta l’agente a orientarsi nella codebase, a individuare relazioni e a recuperare il contesto strutturale corretto.

**Serena riduce il costo di ricostruire ogni volta ciò che già sappiamo.**

Nel setup in cui era presente, contribuiva a fornire memoria e contesto riutilizzabile in una forma più stabile.

**Headroom riduce il costo del contesto che effettivamente finisce nel prompt.**

Lavora su tool output, file, log, history e payload voluminosi cercando di eliminare o comprimere ciò che non serve realmente al modello.

Questi livelli possono sovrapporsi.

Ed è proprio questa sovrapposizione che ha reso l’esperimento interessante.

## Il primo risultato sembrava facile da leggere

Su **Cortex, un progetto su cui stiamo lavorando per strutturare e utilizzare conoscenza in pipeline AI**, stavamo usando:

**Claude Code + Graphify + Headroom**

Per capire cosa facesse davvero Headroom avevamo cercato di ridurre le variabili che potevano confondere il risultato.

Avevamo quindi eseguito Headroom senza code memory, senza output shaping e senza learning.

L’obiettivo era osservare principalmente una cosa:

**quanto riusciva a ridurre l’input context.**

Il risultato era stato circa:

**11% di compressione.**

Non una rivoluzione.

Ma abbastanza da dire:

> bene, qualcosa sta effettivamente eliminando lavoro inutile.

Fin qui tutto semplice.

Poi abbiamo provato qualcosa di simile su un altro progetto.

E i numeri hanno iniziato a raccontare una storia completamente diversa.

## Quando la compressione quasi scompare

Nel secondo caso stavamo lavorando su **NEAT, un progetto dedicato a identità e autenticazione passwordless**.

Qui il setup non era però identico:

**Codex + Graphify + Serena + Headroom**

E Headroom praticamente smise di comprimere.

Su un periodo abbastanza ampio avevamo osservato circa:

**3.113 richieste**

Il contesto complessivo era passato da circa:

**462,6 milioni di token**

a circa:

**460,9 milioni**

Risparmio:

**circa 1,66 milioni di token**

Percentuale:

**circa 0,4%**

Se guardassimo soltanto quella metrica, la conclusione sarebbe abbastanza facile:

> Headroom qui non serve quasi a niente.

Ma nello stesso periodo c’era un altro numero difficile da ignorare:

**cache hit: circa 92,3%.**

Ed è lì che la lettura ha iniziato a diventare meno ovvia.

## E se stessimo guardando la metrica sbagliata?

Una percentuale di compressione bassa sembra immediatamente un risultato negativo.

Se installi uno strumento che comprime il contesto, vuoi vedere il numero salire.

È naturale.

Ma cosa succede se buona parte di quel contesto è già abbastanza stabile da essere recuperata dalla cache?

Forse Headroom non trova molto da comprimere proprio perché un altro pezzo del sistema sta già evitando di pagare nuovamente quel costo.

Nel setup NEAT c’era infatti una differenza importante:

**Serena.**

Questo ci ha portato a un’ipotesi.

Serena potrebbe contribuire a rendere il contesto più stabile e riutilizzabile.

Se il prompt cambia meno tra una richiesta e l’altra, la cache può lavorare meglio.

E se la cache lavora meglio, comprimere quel contesto diventa meno importante.

In altre parole:

> **una metrica di ottimizzazione può peggiorare perché il sistema, nel complesso, è migliorato.**

## Ma attenzione alla storia troppo bella

A questo punto sarebbe molto facile scrivere:

> Serena rende inutile Headroom.

Peccato che non possiamo dimostrarlo.

I due esperimenti non erano un A/B test controllato.

Cambiavano:

- repository;
- agente;
- stack;
- modalità di recupero del contesto;
- probabilmente anche la forma concreta del lavoro svolto.

Quindi sappiamo che abbiamo osservato due comportamenti diversi.

Non sappiamo ancora attribuirne con certezza la causa.

Ed è proprio questo che rende l’esperimento utile.

Perché ci ricorda una cosa abbastanza semplice:

**quando un sistema contiene più ottimizzazioni, misurare il singolo componente può diventare fuorviante.**

## Ottimizzare una metrica non significa ottimizzare il sistema

È molto facile innamorarsi di un numero.

Compression ratio.

Cache hit.

Token risparmiati.

Latenza.

Costo per richiesta.

Sono tutte metriche utili.

Ma diventano pericolose quando iniziamo a trattarle come obiettivi invece che come segnali.

Immaginiamo di riuscire a portare la compressione dal 10% al 50%.

Fantastico.

Ma se, per ottenere quel risultato, rimuoviamo proprio il dettaglio che serviva all’agente per capire correttamente una richiesta, abbiamo davvero ottimizzato qualcosa?

Probabilmente no.

Abbiamo semplicemente prodotto un prompt più piccolo.

L’obiettivo reale non dovrebbe essere:

> comprimere il più possibile.

Dovrebbe essere:

> **eliminare il maggior lavoro inutile possibile senza perdere l’informazione che serve al modello per lavorare bene.**

La differenza sembra sottile.

In realtà cambia completamente il modo in cui valutiamo il risultato.

## La qualità viene prima del risparmio

Durante questi esperimenti c’era una cosa che non volevamo perdere di vista.

Un coding agent lavora spesso su richieste dove i dettagli contano moltissimo.

Nomi precisi.

Tipi.

Enum.

Ordine delle validazioni.

Esclusioni.

Scope.

Test esistenti.

Vincoli architetturali.

Puoi ridurre migliaia di token correttamente.

Poi ne elimini dieci che contenevano l’unica informazione davvero importante.

E hai perso.

Per questo una vera valutazione della compressione non può fermarsi a:

**prima: X token**

**dopo: Y token**

Bisogna anche verificare:

**l’agente continua a fare il lavoro correttamente?**

In uno dei test avevamo scelto volutamente un task reale con vincoli molto precisi proprio per questo motivo.

Non ci interessava soltanto vedere quanto diventava piccolo il contesto.

Ci interessava verificare che l’agente mantenesse:

- nomi corretti;
- tipi corretti;
- enum corretti;
- ordine delle validazioni;
- esclusioni richieste;
- scope dell’intervento;
- test necessari.

Se il prompt diventa più piccolo ma l’implementazione peggiora, non abbiamo risparmiato nulla.

Abbiamo soltanto spostato il costo sulla fase successiva.

## Le ottimizzazioni possono anche pestarsi i piedi

C’è poi un altro aspetto che trovo interessante.

Quando introduci più strumenti che lavorano sul contesto, non puoi assumere che i benefici si sommino linearmente.

Uno strumento può rendere il contesto più stabile.

Un altro può comprimerlo.

Un altro ancora può recuperare soltanto ciò che ritiene rilevante.

Presi singolarmente possono avere tutti senso.

Ma insieme potrebbero:

- sovrapporsi;
- rendersi parzialmente ridondanti;
- nascondere il beneficio reciproco;
- oppure, nel caso peggiore, eliminare informazione utile in più passaggi successivi.

Quindi non basta chiedersi:

> quanto ottimizza Headroom?

oppure:

> quanto è efficace la cache?

La domanda vera diventa:

> **come si comporta l’intera pipeline di contesto?**

Ed è una domanda molto meno comoda.

Perché significa che non possiamo valutare ogni componente isolandolo mentalmente dal resto del sistema.

## Il 0,4% potrebbe essere un ottimo risultato

Questa è forse la parte più controintuitiva dell’esperimento.

Una compressione dello 0,4% sembra pessima.

Ma se il motivo fosse che il sistema sta già riutilizzando efficacemente il contesto grazie alla cache, allora quel numero potrebbe semplicemente dirci:

> qui non c’è molto altro lavoro utile da fare.

Non possiamo ancora affermare che sia questa la causa.

Ma possiamo affermare qualcosa di più generale:

**una percentuale di compressione bassa non basta, da sola, per concludere che uno strumento di ottimizzazione sia inutile.**

Serve capire cosa sta succedendo intorno.

E, allo stesso modo:

**una percentuale di compressione alta non basta per dimostrare che il sistema sia migliore.**

## La domanda giusta è cambiata

All’inizio dell’esperimento la domanda era:

> Quanto riesce a comprimere Headroom?

Alla fine era diventata:

> **Quanto lavoro inutile stiamo evitando complessivamente senza degradare il comportamento dell’agente?**

È una domanda più difficile.

Ma è probabilmente quella utile.

Perché quando lavoriamo con sistemi composti da agenti, cache, memoria, retrieval, tool e compressione, l’ottimo locale di un singolo componente può non coincidere con l’ottimo del sistema.

E questo vale molto oltre Headroom, Serena o Graphify.

Vale per quasi ogni pipeline abbastanza complessa.

## Non ottimizziamo numeri. Ottimizziamo sistemi.

Le metriche servono.

Anzi, senza metriche probabilmente non ci saremmo nemmeno accorti che i due setup stavano comportandosi in modo così diverso.

Ma le metriche hanno bisogno di contesto esattamente quanto gli agenti.

Un 11% può essere buono.

Uno 0,4% può essere buono.

Un 50% potrebbe essere terribile.

Dipende da cosa è successo al resto del sistema.

Quindi oggi, quando guardo una metrica di ottimizzazione, cerco di ricordarmi una cosa:

**il numero non è il risultato.**

Il risultato è ciò che il sistema riesce a fare dopo che abbiamo cambiato quel numero.

E forse ottimizzare il contesto non significa comprimere di più.

Significa sapere **quando non serve più farlo**.
