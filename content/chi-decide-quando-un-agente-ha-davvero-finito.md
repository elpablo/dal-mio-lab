---
title: "Chi decide quando un agente ha davvero finito?"
number: 11
lang: it
date: "2026-11-22"
excerpt: "Un agente può aver superato ogni test e aver fatto ciò che gli abbiamo chiesto. Ma siamo ancora sicuri di avergli chiesto la cosa giusta?"
tags:
  - AI
  - AI Agents
  - Software Engineering
socialImage: "/og-article-11.png"
discussion:
  title: "E nel vostro team?"
  paragraphs:
    - "Come definite il momento in cui un'attività sviluppata con l'aiuto degli agenti AI può essere considerata realmente completata?"
    - "Vi basate principalmente su test e acceptance criteria oppure prevedete anche una verifica degli obiettivi e dei confini architetturali?"
    - "Mi interessa soprattutto capire se vi sia mai capitato di fermare uno sviluppo non perché qualcosa non funzionasse, ma perché vi siete accorti che stavate costruendo più del necessario."
  linkedinPost: https://lnkd.in/p/dBFJtjBg
---

# Chi decide quando un agente ha davvero finito?

*Dal mio Lab — #11*

Un agente AI implementa una funzionalità, esegue i test e comunica che il lavoro è completato.

Tutto verde.

Possiamo considerarlo finito?

Dipende.

Perché un software può funzionare perfettamente, superare tutti i test e fare esattamente quello che gli abbiamo chiesto.

Il problema è capire se **quello che gli abbiamo chiesto è ancora quello di cui avevamo bisogno.**

E soprattutto: chi decide quando è il momento di fermarsi?

## Il significato di “done”

Nello sviluppo software siamo abituati a parlare di requisiti, specifiche, acceptance criteria e Definition of Done.

In teoria, il processo è abbastanza lineare.

Si concorda con il cliente cosa deve fare il software, si definiscono le condizioni che permettono di considerare il lavoro completato e si implementa quanto richiesto.

Gli acceptance test dovrebbero poi verificare che quelle condizioni siano state soddisfatte.

Nella pratica, però, le cose sono raramente così semplici.

I requisiti possono cambiare, emergono problemi che non avevamo previsto e durante lo sviluppo scopriamo opportunità che inizialmente non avevamo considerato.

È normale. Fa parte dell'ingegneria del software.

Il punto è che ogni nuova possibilità ci mette davanti a una decisione: è qualcosa che dobbiamo realmente implementare, oppure è semplicemente qualcosa che *potremmo* implementare?

La differenza sembra sottile.

Ma può determinare il successo di un progetto.

## Quando migliorare significa complicare

Nel nostro Lab stavamo lavorando a un progetto che prevedeva un engine per la gestione di alcuni servizi software.

Le sue responsabilità erano abbastanza precise: avviare, arrestare e monitorare lo stato dei servizi, mantenendo chiari i confini tra i diversi componenti dell'architettura.

Durante la progettazione abbiamo iniziato a considerare alcune funzionalità aggiuntive.

Per esempio, perché non permettere all'engine di creare e gestire direttamente anche i container Docker?

Tecnicamente era una strada percorribile.

E potevamo trovare diverse buone ragioni per seguirla.

Avremmo avuto un componente più autonomo, capace di occuparsi di un numero maggiore di operazioni.

Poi, discutendo l'architettura, ci siamo fermati.

Ci siamo accorti che stavamo progressivamente cambiando il mestiere dell'engine.

Da componente responsabile della gestione dei servizi rischiava di trasformarsi in un piccolo sistema di orchestrazione.

Una specie di Kubernetes in miniatura, sviluppato in casa.

Con l'interessante opportunità di scoprire personalmente una buona parte dei problemi che Kubernetes ha impiegato anni ad affrontare.

Non c'era una singola decisione evidentemente sbagliata.

C'era un team che, cercando di migliorare progressivamente uno strumento, stava perdendo di vista il suo obiettivo originale.

Abbiamo quindi ripreso le specifiche, chiarito le responsabilità e deciso cosa dovesse rimanere fuori.

Non abbiamo rinunciato a una funzionalità perché fosse troppo difficile da realizzare.

**Abbiamo deciso di non realizzarla perché non apparteneva a quel componente.**

## Il costo delle funzionalità che non servivano

Con gli agenti AI, aggiungere funzionalità è diventato straordinariamente semplice.

Un'idea che prima avrebbe richiesto giorni di sviluppo oggi può essere implementata in tempi molto più brevi.

Questo cambia il modo in cui percepiamo il costo delle nostre decisioni.

Se aggiungere una funzionalità richiede poco tempo, siamo naturalmente portati a considerarla un miglioramento quasi gratuito.

Ma scrivere il codice è soltanto una parte del costo.

Ogni nuova responsabilità introduce potenzialmente nuovi stati da gestire, errori da prevedere, test da mantenere, interazioni con altri componenti e decisioni architetturali da documentare.

E quella complessità rimane anche dopo che l'agente ha terminato il proprio lavoro.

**Il costo di implementare una funzionalità può diminuire enormemente. Il costo di mantenerla non diminuisce necessariamente nella stessa misura.**

È un aspetto che rischiamo di sottovalutare proprio perché gli strumenti di sviluppo sono diventati così efficienti.

E il problema non riguarda soltanto l'AI.

Anche un team composto esclusivamente da sviluppatori umani può cadere nella stessa trappola.

L'AI, semmai, ci permette di arrivarci molto più velocemente.

## I test passano. Ma stiamo ancora costruendo la cosa giusta?

Negli [articoli precedenti](/articles/quando-posso-lasciare-un-agente-lavorare-da-solo) abbiamo ragionato su quando sia possibile lasciare un agente lavorare autonomamente e su quali verifiche siano necessarie.

Qui emerge un altro aspetto.

Un test può verificare che un comportamento sia corretto rispetto a una specifica.

Ma se durante lo sviluppo abbiamo ampliato progressivamente quella specifica, i test possono confermare che abbiamo implementato correttamente anche funzionalità di cui non avevamo realmente bisogno.

In altre parole, possiamo avere un software perfettamente funzionante che nel frattempo è diventato qualcosa di diverso dal progetto originale.

Ecco perché credo che la verifica debba avvenire su due livelli.

Il primo è tecnico: il software funziona, rispetta i vincoli e supera i test previsti?

Il secondo riguarda gli obiettivi: quello che stiamo costruendo risponde ancora al problema che dovevamo risolvere?

Sono due verifiche diverse.

Ed entrambe sono necessarie.

## La Definition of Done non è immutabile

Naturalmente, questo non significa che dobbiamo definire ogni dettaglio all'inizio e impedire qualsiasi cambiamento.

Sarebbe una forma di sviluppo waterfall mascherata da processo moderno.

Durante un progetto impariamo continuamente qualcosa.

Scopriamo vincoli, cambiamo idea, individuiamo soluzioni migliori.

E sarebbe assurdo ignorare queste informazioni soltanto perché non erano presenti nella specifica iniziale.

La Definition of Done può evolvere.

Ma dovrebbe farlo attraverso decisioni consapevoli e condivise, non come conseguenza automatica di ogni nuova possibilità tecnica.

Se emerge una nuova funzionalità interessante, possiamo discuterla, valutarne l'impatto e decidere se includerla.

Oppure possiamo rimandarla.

O scartarla.

Anche decidere cosa non implementare è una decisione di engineering.

E spesso è una delle più importanti.

## Chi ha la responsabilità di fermarsi?

Quando lavoriamo con gli agenti AI, la tentazione è assegnare un obiettivo e aspettare che il sistema comunichi di aver completato il lavoro.

Ma *completato* rispetto a cosa?

Se i criteri sono ambigui, se i confini architetturali non sono chiari o se durante lo sviluppo cambiamo continuamente l'obiettivo senza rivalutarlo, non possiamo aspettarci che un semplice messaggio di completamento risolva il problema.

Per questo considero fondamentale che il team mantenga una visione condivisa del risultato atteso.

Gli agenti possono contribuire a discutere le scelte, individuare problemi, proporre alternative e verificare il lavoro.

Ma il completamento non dovrebbe essere determinato soltanto dalla quantità di codice prodotto o dal numero di test superati.

Dovrebbe essere il risultato di una verifica rispetto agli obiettivi concordati.

Nel nostro caso, fermarci a riconsiderare il ruolo dell'engine ci ha permesso di evitare complessità che non avrebbero migliorato la soluzione al problema originale.

E ci ha ricordato una cosa importante.

**Il “done” non è il momento in cui non abbiamo più idee da aggiungere. È il momento in cui abbiamo soddisfatto gli obiettivi concordati.**

Tutto quello che viene dopo può essere un'altra funzionalità, un'altra iterazione o perfino un altro progetto.

Ma dovrebbe esserlo per scelta.

Non per inerzia.
