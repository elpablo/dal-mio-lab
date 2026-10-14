---
title: "Quando posso lasciare un agente lavorare da solo?"
number: 9
lang: it
date: "2026-10-14"
excerpt: "Quanto possiamo lasciare autonomo un agente? Forse la risposta dipende meno da quanto è capace e più da quanto siamo in grado di verificare ciò che gli deleghiamo."
tags:
  - AI
  - AI Agents
  - Software Engineering
  - Developer Tools
socialImage: "/og-article-9.png"
discussion:
  title: "Come la state affrontando voi?"
  paragraphs:
    - "Quando lasciate lavorare autonomamente un agente, qual è il criterio che usate per decidere quanto controllo mantenere?"
    - "E soprattutto: prima di delegare un task, sapete già come vi accorgerete se il risultato è sbagliato?"
  linkedinPost: https://lnkd.in/p/dq6Wc6P4
---

# Dal mio Lab #9 <br class="mobile-title-break">— Quando posso lasciare un agente lavorare da solo?

Qualche giorno fa volevamo provare un nuovo modello.

Avevamo già quasi tutto quello che serviva.

Un repository pubblico.

Un documento reale che in passato ci aveva creato problemi.

Una serie di domande che avevamo già usato per valutare altri approcci.

E un risultato abbastanza chiaro da produrre alla fine:

> esegui l’esperimento, raccogli i risultati e dimmi come è andata.

Guardando il task mi sono fatto una domanda:

**perché dovrei stare lì mentre lo fa?**

Un agente potrebbe scaricare il repository.

Preparare l’ambiente.

Installare le dipendenze.

Eseguire le prove.

Registrare eventuali failure.

Riprovare quando qualcosa non funziona.

E alla fine produrre un report.

In quel caso, probabilmente, sarei perfettamente felice di lasciarlo lavorare da solo.

Su altri progetti, invece, facciamo quasi esattamente il contrario.

Ed è questa differenza che mi interessa.

## Non dipende soltanto da quanto è bravo l’agente

Quando parliamo di autonomia degli agenti, la discussione tende facilmente a concentrarsi sulle loro capacità.

Quanto è intelligente il modello?

Sa usare il terminale?

Sa modificare codice?

Sa navigare?

Sa correggersi quando qualcosa fallisce?

Sono tutte domande sensate.

Ma lavorandoci mi sembra che ne manchi una altrettanto importante:

> **come faccio a sapere se il risultato è corretto?**

Perché ci sono attività complesse che posso verificare abbastanza facilmente.

E decisioni apparentemente semplici per cui potrei scoprire soltanto mesi dopo di aver scelto male.

## Un esperimento può essere molto autonomo

Prendiamo il caso del modello che volevamo provare.

Il task potrebbe essere descritto abbastanza precisamente:

usa questo documento.

Usa queste domande.

Prova queste configurazioni.

Registra tempi, errori e risultati.

Confrontali.

Produci un report riproducibile.

L’agente potrebbe incontrare decine di problemi durante il percorso.

Una dipendenza incompatibile.

Un comando sbagliato.

Una configurazione che esaurisce la memoria.

Un formato inatteso.

Ma buona parte di questi problemi produce un feedback evidente.

Il comando fallisce.

Il test non parte.

La risposta non contiene l’informazione richiesta.

Il risultato può essere confrontato con ciò che ci aspettavamo.

In altre parole, l’agente ha qualcosa contro cui correggersi.

Non significa che il task sia facile.

Significa che è **verificabile**.

## Poi ci sono le decisioni che funzionano benissimo

Ed è qui che la faccenda diventa più interessante.

Negli ultimi mesi abbiamo lavorato molto su un sistema di identità e autenticazione per persone e agenti software.

In quel progetto ci è capitato diverse volte di arrivare a una soluzione che:

compilava.

Passava i test.

Era tecnicamente coerente.

Risolveva il problema che avevamo davanti.

E poi fermarci.

Non perché qualcosa fosse rotto.

Ma perché durante la discussione emergeva una domanda nuova.

> Se facciamo così, cosa succede in quest’altro scenario?

A volte quella domanda ci ha fatto cambiare direzione.

Il punto importante è che **non c’era necessariamente un test rosso a dirci di fermarci**.

Un agente incaricato semplicemente di portare a termine il task avrebbe potuto proseguire perfettamente.

E avrebbe avuto anche ottime ragioni per farlo.

## Una soluzione può essere corretta per la domanda sbagliata

È probabilmente questa la distinzione che trovo più utile.

In alcuni task conosciamo già abbastanza bene:

- il problema;
- gli input;
- il risultato atteso;
- il modo in cui valuteremo quel risultato.

In altri stiamo ancora scoprendo una di queste cose.

E quando succede, il rischio non è soltanto che l’agente sbagli la soluzione.

È che produca una buona soluzione a **una formulazione incompleta del problema**.

Questo è molto più difficile da rilevare automaticamente.

Perché tutto può sembrare perfettamente corretto.

## Il test più importante potrebbe essere fuori dal codice

Nel software siamo abituati a pensare alla verificabilità attraverso i test.

Ed è giusto.

Ma qui il concetto è più ampio.

Posso verificare un esperimento perché conosco le domande alle quali deve rispondere.

Posso verificare una migrazione perché conosco lo stato iniziale e quello finale.

Posso verificare un bug fix perché ho una riproduzione.

Posso verificare una trasformazione perché conosco gli invarianti che devono rimanere veri.

Più è chiaro il modo in cui osserverò il risultato, più posso permettere all’agente di scegliere autonomamente **come arrivarci**.

Il punto non è quindi controllare ogni passaggio.

È costruire abbastanza bene il confine del problema.

## Contesto e autonomia non sono la stessa cosa

Nel [**precedente articolo, “Un agente sa scrivere codice. Ma sa perché lo sta scrivendo?”**](/articles/un-agente-sa-scrivere-codice-ma-sa-perche-lo-sta-scrivendo), avevo scritto che un agente può conoscere perfettamente il codice e non conoscere le ragioni che hanno prodotto quel codice.

Più autonomia richiede più contesto.

Continuo a pensarlo.

Ma mi sembra che non basti.

Possiamo dare all’agente tutta la storia del progetto.

Le decisioni precedenti.

Le alternative scartate.

I vincoli.

Gli acceptance criteria.

E avere comunque una decisione per cui noi stessi non sappiamo ancora quali conseguenze dovremmo osservare.

In quel caso il problema non è che all’agente manca contesto.

È che **la conoscenza necessaria alla decisione non esiste ancora**.

La stiamo costruendo mentre ragioniamo.

## Ci sono momenti in cui voglio essere interrotto

Qualche tempo fa avevo scritto che [*human-in-the-loop* non dovrebbe significare premere “Approva” ogni trenta secondi](/articles/human-in-the-loop-non-significa-premere-approva).

Lo penso ancora.

Ma nemmeno l’estremo opposto mi convince:

> prendi il task e torna quando hai finito.

Ci sono attività per cui è esattamente ciò che voglio.

Ce ne sono altre in cui voglio che il processo si fermi davanti a una nuova assunzione.

Non perché debba essere necessariamente l’umano a decidere.

Ma perché quello è il momento in cui **il problema stesso sta cambiando**.

In quei punti una conversazione può valere molto più di altre cento righe di implementazione.

## L’autonomia non è un interruttore

Forse uno dei motivi per cui trovo poco utile parlare genericamente di “agenti autonomi” è proprio questo.

L’autonomia non mi sembra una proprietà che posso semplicemente impostare su:

`true`

Dipende dal lavoro che sto delegando.

Posso concedere enorme libertà nell’esecuzione di un esperimento e pochissima nella definizione di un trust model.

Posso lasciare che un agente iteri autonomamente per ore su una configurazione e voler discutere insieme una decisione che richiede cinque minuti.

Non c’è contraddizione.

Sto semplicemente delegando cose diverse.

## Più libertà su come, più precisione su cosa

Questo porta a una conseguenza che inizialmente mi sembrava quasi paradossale.

Per lasciare lavorare un agente con maggiore autonomia devo spesso fare **più lavoro prima**.

Definire meglio il task.

Preparare gli input.

Stabilire i vincoli.

Decidere quali artefatti voglio ricevere.

Soprattutto, capire come valuterò il risultato.

Non sto specificando ogni passaggio.

Sto facendo quasi il contrario.

> **Più riesco a definire cosa significa “finito correttamente”, meno bisogno ho di controllare come ci arriva.**

Questa è una forma di controllo molto diversa dal supervisionare ogni azione.

## L’ambiente conta

C’è poi un’altra condizione.

Anche un task perfettamente verificabile può essere pericoloso se l’agente può danneggiare qualcosa mentre lo esegue.

Se deve installare software, provare dipendenze, compilare repository sconosciuti o modificare configurazioni, non voglio necessariamente che lo faccia sullo stesso ambiente che ospita sistemi che devono continuare a funzionare.

Per questo stiamo iniziando a ragionare su un piccolo laboratorio isolato in cui un agente possa sperimentare liberamente.

Qualcosa che possa essere creato, utilizzato e poi buttato via.

Non perché l’agente debba essere considerato ostile.

Ma perché un esperimento dovrebbe poter fallire **senza rendere interessante anche il resto della giornata**.

Quella parte, però, è ancora un esperimento a sua volta.

Prima voglio vedere cosa succede quando proviamo davvero a usarla.

## Il criterio che sto iniziando a usare

Alla fine sono arrivato a una domanda molto più semplice di quelle da cui ero partito.

Prima di decidere quanta autonomia concedere a un agente, provo a chiedermi:

> **se prendesse una decisione sbagliata, quanto sarebbe facile accorgermene?**

Se posso verificarla rapidamente, se il risultato è reversibile e se l’ambiente limita le conseguenze di un errore, posso concedere molta autonomia.

Se invece una scelta può sembrare corretta per mesi prima di mostrarne le conseguenze, voglio essere molto più vicino al processo.

Non è necessariamente una questione di fiducia nell’agente.

È una questione di **feedback**.

## Non voglio controllare tutto

L’obiettivo, almeno per me, non è arrivare ad agenti che abbiano bisogno di chiedere il permesso prima di ogni comando.

Sarebbe poco più di un terminale estremamente educato.

Vorrei invece poter dire:

> questo è il problema.

> questi sono i confini.

> questo è il modo in cui sapremo se hai avuto successo.

> vai.

E tornare quando esiste già qualcosa da valutare.

Ma voglio anche riconoscere i task in cui quella frase sarebbe prematura.

Perché c’è una differenza importante tra delegare l’esecuzione e delegare la scoperta di **quale problema stiamo realmente cercando di risolvere**.

Forse la quantità di autonomia che possiamo concedere a un agente non dipende soltanto da quanto è diventato bravo.

Dipende anche da quanto siamo diventati bravi noi a **verificare ciò che gli chiediamo di fare**.
