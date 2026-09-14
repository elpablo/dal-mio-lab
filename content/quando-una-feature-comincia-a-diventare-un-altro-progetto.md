---
title: "Quando una feature comincia a diventare un altro progetto"
number: 6
lang: it
excerpt: "I confini architetturali non arrivano sempre già disegnati. A volte il problema è accorgersi che quella che continuiamo a chiamare “feature” ha già iniziato a comportarsi come un sistema."
tags:
  - AI
  - Software Architecture
  - Software Engineering
socialImage: "/og-article-6.png"
discussion:
  title: "Come la state affrontando voi?"
  paragraphs:
    - "Vi è mai capitato di aggiungere “solo una feature” e accorgervi qualche settimana dopo che stavate costruendo praticamente un altro prodotto dentro il primo?"
    - "E soprattutto:"
    - "Quale segnale vi ha fatto capire che era arrivato il momento di separare le responsabilità?"
---

# Dal mio Lab #6 <br class="mobile-title-break">— Quando una feature comincia a diventare un altro progetto

Molti sistemi non diventano monoliti perché qualcuno, un lunedì mattina, decide:

> Costruiamo un monolite.

Ci arrivano un passo alla volta.

Aggiungiamo solo questa informazione.

Poi dobbiamo salvarla.

Poi arricchirla.

Poi classificarla.

Poi ricordarci da dove arriva.

Poi capire quanto possiamo fidarci.

Poi qualcuno deve aggiornarla.

E a un certo punto quella che continuavamo a chiamare “feature” ha un modello dati, un lifecycle, delle regole proprie e probabilmente anche opinioni personali.

È più o meno quello che ci è successo lavorando su Council.

## Council doveva prendere decisioni

**Council** è un progetto su cui lavoriamo nel Lab per far analizzare uno stesso problema a più agenti specializzati, prima che un Judge raccolga i diversi punti di vista e produca una decisione.

L’idea di base è abbastanza semplice.

Un problema entra.

Diversi ruoli lo osservano da prospettive differenti.

Le risposte vengono raccolte, controllate e sintetizzate.

Ne avevo raccontato una parte in [**“Il modello più grande non è sempre quello giusto”**](/articles/il-modello-piu-grande-non-e-sempre-quello-giusto), quando ci eravamo scontrati con modelli troppo pesanti, output troncati e parallelismo.

Ma Council, nel frattempo, continuava a crescere.

Orchestrazione.

DAG.

Cache.

Validazione.

Raccolta dei risultati.

Enrichment.

Scoring.

Classificazione.

Tutte responsabilità che avevano ancora abbastanza senso dentro un sistema il cui compito era:

**prendere informazioni e ragionarci sopra.**

Poi abbiamo iniziato a parlare di conoscenza.

Ed è lì che le cose hanno cominciato a cambiare.

## “Già che abbiamo i dati…”

Il ragionamento era naturale.

Council riceve già informazioni.

Gli agenti le analizzano.

Producono risultati.

Alcuni di quei risultati potrebbero essere utili anche in futuro.

Quindi perché non conservarli?

Fin qui niente di strano.

Poi però arriva la seconda domanda:

> Se li conserviamo, come sappiamo da dove arrivano?

Poi:

> E quanto sono affidabili?

Poi:

> Se due fonti dicono cose diverse?

Poi:

> Se una conoscenza diventa obsoleta?

Poi:

> Come rappresentiamo le relazioni tra le entità?

Poi:

> Chi aggiorna tutto questo?

Ed è stato lì che abbiamo iniziato a renderci conto che forse non stavamo più aggiungendo una capacità a Council.

**Stavamo costruendo un altro sistema dentro Council.**

## Il numero di righe di codice non c’entra

Questa secondo me è una delle parti più insidiose.

È facile accorgersi che un componente sta diventando troppo grande quando contiene centomila righe di codice.

Molto più difficile accorgersene quando il codice ancora non esiste.

Il segnale vero non è necessariamente la dimensione.

Sono le **domande che quella responsabilità comincia a generare**.

Nel nostro caso, la conoscenza iniziava ad avere bisogno di risposte proprie:

- qual è la sua fonte?
- quali evidenze la supportano?
- quanto è affidabile?
- quali entità coinvolge?
- quali relazioni descrive?
- quando è stata osservata?
- quando deve essere aggiornata?
- quando può essere eliminata?
- chi la produce?
- chi la consuma?

Queste non erano più domande sul reasoning di Council.

Erano domande sulla **vita della conoscenza stessa**.

E questo cambiava parecchio le cose.

## Due verbi diversi

A un certo punto abbiamo provato a semplificare il problema guardando semplicemente ai verbi.

Council deve:

**ragionare.**

Lo strato che stavamo progettando doveva invece:

**costruire e mantenere conoscenza.**

Sembrano attività correlate.

Lo sono.

Ma non sono la stessa responsabilità.

Council deve essere bravo a ricevere informazioni, metterle in relazione, farle analizzare da prospettive diverse e arrivare a una decisione.

Un sistema di conoscenza deve invece preoccuparsi di fonti, evidenze, confidence, entità, relazioni, persistenza, aggiornamento e lifecycle.

Ed è stata probabilmente questa distinzione a rendere evidente il confine.

> **Council dovrebbe consumare conoscenza. Non possederne il lifecycle.**

## Da lì è nato Cortex

Quella discussione ha progressivamente dato forma a **Cortex, un progetto dedicato a costruire e rendere disponibile conoscenza strutturata per pipeline AI**.

La separazione concettuale ha iniziato a diventare qualcosa del genere:

**Cortex → Structured Knowledge → Council → Decision**

Cortex costruisce e mantiene la conoscenza.

Council la usa per ragionare.

Sembra una distinzione ovvia quando la guardi dopo.

Prima non lo era affatto.

Perché il percorso più corto sarebbe stato semplicemente continuare ad aggiungere codice a Council.

Dopotutto era già lì.

Aveva già i dati.

Aveva già gli agenti.

Aveva già buona parte dell’infrastruttura.

Il classico:

> Già che ci siamo…

Quattro parole responsabili di una quantità probabilmente incalcolabile di debito architetturale.

## Quando una cosa ha un modello proprio, forse sta cercando di dirti qualcosa

Separando il problema abbiamo iniziato anche a ragionare sulla conoscenza come oggetto autonomo.

Non più semplicemente:

> una risposta prodotta da un agente.

Ma qualcosa che potesse avere concetti come:

**identità.**

**tipo.**

**fonte.**

**evidenze.**

**confidence.**

**entità.**

**relazioni.**

**metadata.**

I singoli campi non sono il punto importante.

Il punto è che, quando una responsabilità inizia ad avere bisogno di un proprio vocabolario, di proprie regole e di un proprio lifecycle, probabilmente sta cercando di dirci qualcosa.

Forse non è più soltanto un dettaglio del sistema in cui l’abbiamo incontrata.

## Questo non significa “facciamo un microservizio”

Qui bisogna stare attenti all’altro estremo.

Scoprire un nuovo confine concettuale non significa automaticamente creare:

un nuovo processo,

un nuovo database,

una nuova API,

un nuovo repository,

un cluster Kubernetes,

e magari anche un logo.

Separare le responsabilità non significa necessariamente distribuire fisicamente il software.

Un confine può diventare:

- un modulo;
- un package;
- un bounded context;
- una libreria;
- un repository distinto;
- oppure, quando serve davvero, un servizio separato.

La decisione fisica viene dopo.

La prima domanda è molto più semplice:

> **chi è responsabile di cosa?**

Perché se questa risposta rimane confusa, spostare il codice in due repository diversi non risolve nulla.

Avremo soltanto due repository confusi.

## Come capire che una feature sta diventando qualcos’altro

Non credo esista una regola matematica.

Però ci sono alcuni segnali che ora mi fanno drizzare le antenne.

Una nuova capacità comincia ad avere un **proprio modello dati**.

Poi compare un **lifecycle indipendente**.

Cominciano a emergere **regole che hanno senso anche senza il sistema che inizialmente ospitava quella capacità**.

Arrivano produttori e consumatori diversi.

Il vocabolario cresce.

Le modifiche iniziano ad avere una propria direzione evolutiva.

E, soprattutto, quando descrivi il sistema inizi a dire frasi tipo:

> Council prende decisioni e poi gestisce anche tutta la conoscenza…

Quell’**“e poi”** merita spesso qualche domanda in più.

Non significa necessariamente che il confine sia sbagliato.

Ma significa che vale la pena guardarlo.

## Non serve prevedere tutto all’inizio

La cosa interessante è che questa separazione non avremmo potuto progettarla perfettamente all’inizio.

O almeno, avremmo potuto provarci.

Avremmo disegnato scatole.

Definito responsabilità.

Previsto interfacce.

E probabilmente ci saremmo comunque sbagliati su qualcosa.

Il confine è diventato evidente perché abbiamo costruito Council abbastanza da vedere quali responsabilità stavano realmente emergendo.

Questo, per me, è un punto importante.

Una buona architettura non significa necessariamente conoscere in anticipo tutti i confini del sistema.

Significa anche essere capaci di **riconoscerli quando iniziano ad apparire**.

E avere abbastanza libertà da correggere la struttura prima che l’accoppiamento renda il cambiamento troppo costoso.

## Il costo di separare troppo presto e quello di separare troppo tardi

C’è sempre un equilibrio.

Se separiamo qualsiasi cosa appena compare, costruiamo architetture enormi per problemi che magari non esisteranno mai.

Se invece aspettiamo troppo, rischiamo di scoprire il confine soltanto dopo che dati, regole e lifecycle sono ormai intrecciati ovunque.

Nel caso di Cortex, il momento utile è arrivato quando abbiamo iniziato a renderci conto che la conoscenza non era semplicemente un altro output di Council.

Aveva iniziato ad avere una propria vita.

Quello era il segnale.

**Non serviva sapere ancora esattamente come sarebbe diventato Cortex. Serviva capire che non doveva diventare Council.**

## Le feature non conoscono i nostri diagrammi

Ci piace disegnare architetture con scatole ben definite.

Poi iniziamo a costruire.

E il software, con una certa maleducazione, comincia a suggerirci che alcune scatole erano sbagliate.

Una responsabilità cresce.

Un concetto acquista importanza.

Una feature inizia a servire altri consumatori.

E il confine si sposta.

Non credo che questo significhi che l’architettura iniziale fosse necessariamente sbagliata.

Significa che abbiamo imparato qualcosa che prima non sapevamo.

Il problema nasce quando continuiamo a difendere il diagramma invece di ascoltare quello che il sistema ci sta dicendo.

I confini architetturali raramente arrivano già disegnati.

Spesso emergono mentre il sistema cresce.

Il nostro lavoro non è prevederli tutti.

È accorgerci abbastanza presto quando una responsabilità sta diventando qualcosa di diverso.

Perché forse una feature diventa davvero un problema quando continuiamo a chiamarla **feature** dopo che ha già iniziato a comportarsi come un **sistema**.
