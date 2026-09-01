---
title: "Human-in-the-loop non significa premere “Approva”"
number: 4
excerpt: "Mettere un umano davanti a ogni decisione non significa necessariamente avere più controllo. Il vero problema è capire dove il contributo umano crea davvero valore."
tags:
  - AI
  - AI Agents
  - Software Engineering
socialImage: "/og-article-4.png"
discussion:
  title: "Come la state affrontando voi?"
  paragraphs:
    - "Nei sistemi AI che state costruendo, dove avete deciso di mettere davvero l’essere umano?"
    - "Quali azioni lasciate completamente autonome?"
    - "Quali richiedono un checkpoint?"
    - "E quali non deleghereste ancora a un agente?"
    - "Mi interessa soprattutto capire come cambia questa scelta quando aumentano autonomia, rischio e conseguenze delle decisioni."
  linkedinPost: "https://lnkd.in/p/ds-qpCve"
---

# Dal mio Lab #4 <br class="mobile-title-break">— Human-in-the-loop non significa premere “Approva”

Quando si parla di agenti AI, “human-in-the-loop” viene spesso tradotto in una scena abbastanza semplice:

l’AI propone qualcosa.

L’umano guarda.

L’umano preme **Approva**.

Tutti contenti: abbiamo mantenuto il controllo.

Il problema è che, se devo approvare ogni cosa che l’agente fa, forse non ho costruito un agente.

Ho costruito un collega estremamente veloce che mi interrompe ogni trenta secondi.

## Più approvazioni non significano necessariamente più controllo

Mettere un essere umano davanti a ogni decisione sembra, a prima vista, la soluzione più sicura.

L’agente prepara qualcosa.

L’umano controlla.

L’umano approva.

L’agente continua.

Funziona bene se succede ogni tanto.

Ma immaginiamo che l’agente esegua decine o centinaia di operazioni.

Approvi?

Approvi?

Approvi?

Approvi?

A un certo punto il rischio è che il controllo umano diventi semplicemente un passaggio meccanico.

Non perché la persona sia irresponsabile.

Perché l’attenzione è una risorsa limitata.

Se ogni operazione viene trattata come critica, alla fine nessuna riceve davvero l’attenzione che meriterebbe.

Ed emerge un paradosso interessante:

**più interventi umani introduciamo, meno attenzione umana potrebbe ricevere ciascun intervento.**

Quindi la domanda forse non dovrebbe essere:

> Come facciamo a mettere un essere umano dentro ogni decisione?

Ma:

> **Quali decisioni meritano davvero l’intervento umano?**

## L’umano non deve stare sempre nello stesso punto

Un’altra semplificazione che trovo poco utile è pensare all’human-in-the-loop come a una posizione fissa.

L’umano può stare **prima** del processo.

Può stare **dentro**.

Può osservarlo **dall’alto**.

Può intervenire **dopo**.

E, soprattutto, può cambiare posizione durante il progetto.

All’inizio il suo ruolo è fondamentale.

Bisogna definire cosa vogliamo ottenere.

Quali sono i vincoli.

Cosa l’agente può fare.

Cosa non deve fare.

Come capiremo se il risultato è corretto.

Se partiamo senza una direzione chiara, l’AI è perfettamente capace di portarci da qualche parte molto velocemente.

Il problema è che potrebbe non essere il posto in cui volevamo andare.

Ma questo non significa dover progettare in anticipo ogni singolo passaggio possibile.

Nei progetti reali emergono informazioni nuove.

Arrivano failure.

Scopriamo vincoli che non avevamo considerato.

Cambiano le priorità.

Un’ipotesi che sembrava ottima si rivela sbagliata.

Avere una direzione chiara all’inizio è indispensabile.

**Pretendere di conoscere già tutta la strada, invece, è spesso un’illusione.**

Quindi la posizione dell’umano cambia.

Può entrare nel loop quando serve una decisione.

Può spostarsi sopra il loop per osservare il comportamento complessivo.

Può analizzare quello che è successo dopo un’esecuzione.

E può tornare prima del loop per cambiare regole, ruoli o obiettivi nell’iterazione successiva.

Il punto non è decidere una volta per tutte dove mettere l’essere umano.

È progettare **come e quando deve spostarsi**.

L’alternativa sarebbe definire tutto nei minimi dettagli, far partire l’agente e dire:

> Ci vediamo quando il progetto è finito.

Quello non è human-in-the-loop.

È speranza assistita da GPU.

## Un esempio dal Lab

Abbiamo incontrato questo problema anche lavorando su **Council**, il nostro sistema in cui diversi agenti con ruoli differenti analizzano lo stesso problema prima che un Judge produca una sintesi.

Ne avevo raccontato una parte in [“Il modello più grande non è sempre quello giusto”](/articles/il-modello-piu-grande-non-e-sempre-quello-giusto).

Durante i primi esperimenti avevamo agenti che producevano output troncati, modelli troppo pesanti per alcuni ruoli e problemi di affidabilità quando aumentavamo il parallelismo.

Avremmo potuto inserire un umano dopo ogni risposta.

Leggi il risultato.

Approva.

Passa al prossimo agente.

Ma non avrebbe risolto il problema.

Il problema non era la singola risposta.

Era **come avevamo progettato il sistema**.

L’intervento umano utile è stato un altro:

- osservare i failure;
- capire dove stavamo consumando risorse senza ottenere valore;
- cambiare il modello assegnato ai diversi ruoli;
- limitare il parallelismo;
- eseguire nuovamente il Council;
- osservare cosa era cambiato.

L’umano non ha sostituito gli agenti nel loro lavoro.

Ha cambiato il modo in cui gli agenti lavoravano.

Ed è forse la cosa che mi interessa di più di tutta questa discussione:

**il contributo umano non era fare il lavoro degli agenti. Era progettare come quel lavoro doveva essere fatto.**

## Non tutte le azioni sono uguali

Immaginiamo un agente che può:

- fare una ricerca sul Web;
- modificare una bozza;
- creare una issue;
- fare merge su `main`;
- inviare una fattura;
- effettuare un pagamento.

Ha senso applicare lo stesso livello di supervisione umana a tutte queste azioni?

Probabilmente no.

Per decidere quanto avvicinare l’essere umano all’azione trovo utili tre domande.

### Quanto è incerta la decisione?

L’agente sta svolgendo un compito molto deterministico oppure deve interpretare informazioni ambigue?

Più aumenta l’incertezza, più può essere utile un checkpoint umano.

### Quali sono le conseguenze di un errore?

Se il risultato è una bozza sbagliata, possiamo correggerla.

Se è un bonifico da ventimila euro, forse vogliamo pensarci un po’ di più.

### Quanto è reversibile l’azione?

Cancellare un file recuperabile dal cestino e pubblicare informazioni riservate su Internet non sono la stessa cosa.

Più un’azione è difficile da annullare, più ha senso avvicinare la supervisione al momento in cui viene eseguita.

Potremmo quindi sintetizzare il principio così:

**più una decisione è incerta, importante e irreversibile, più l’essere umano dovrebbe essere vicino all’azione.**

Viceversa, quando l’operazione è prevedibile, poco rischiosa e facilmente reversibile, possiamo concedere molta più autonomia.

## Regole, reasoning e responsabilità

C’è poi un altro aspetto che trovo importante.

Non tutto dovrebbe essere deciso da un modello.

Alcune cose sono semplicemente **regole**.

Un agente non può spendere più di una certa cifra.

Non può modificare determinati dati.

Non può accedere a una risorsa fuori da uno scope.

Non serve necessariamente un LLM per decidere queste cose.

Altre attività richiedono invece **reasoning**.

Interpretare una richiesta.

Confrontare alternative.

Trovare una soluzione.

Capire come procedere quando non esiste una strada predefinita.

Ed è proprio qui che gli agenti diventano interessanti.

Ma resta un terzo elemento:

**la responsabilità.**

Automatizzare l’esecuzione non fa sparire la responsabilità del risultato.

Un agente può scegliere autonomamente quale query utilizzare per trovare un’informazione.

Può decidere come sintetizzarla.

Può persino scegliere tra più strumenti disponibili.

Ma forse non dovrebbe poter spendere ventimila euro soltanto perché il suo reasoning gli è sembrato convincente.

Il punto non è limitare l’AI per principio.

È capire quali decisioni appartengono al reasoning e quali invece devono essere governate da regole, policy o responsabilità umane.

## L’expertise umana è anch’essa una risorsa

Quando parliamo di AI tendiamo spesso a ragionare sull’efficienza dei modelli.

Token.

Latenza.

Memoria.

Costo.

Ma anche il tempo umano ha un costo.

E soprattutto l’attenzione di una persona esperta è limitata.

Se chiediamo a un professionista di approvare cento operazioni banali, stiamo consumando una risorsa preziosa nel posto sbagliato.

Forse il valore dell’expertise umana non sta nel controllare tutto quello che l’AI produce.

Sta nel sapere **cosa vale la pena controllare**.

E, ancora meglio, nel progettare un sistema in cui molte decisioni possano essere prese correttamente senza richiedere ogni volta il suo intervento.

Questo non significa togliere l’umano dal sistema.

Significa utilizzare il suo contributo dove produce più valore.

## Il controllo non è un pulsante

Più lavoro con sistemi agentici, meno mi convince l’idea che human-in-the-loop significhi semplicemente aggiungere un pulsante **Approva**.

A volte servirà esattamente quello.

In altri casi l’umano dovrebbe intervenire molto prima, progettando regole e limiti.

In altri ancora dovrebbe osservare il sistema e intervenire soltanto quando qualcosa esce dai parametri previsti.

E in altri casi dovrebbe guardare ciò che è successo dopo e usare quell’esperienza per migliorare l’iterazione successiva.

Forse quindi la domanda corretta non è:

> Come facciamo a mantenere sempre un essere umano nel loop?

Ma:

> **Quali decisioni meritano davvero il tempo, l’esperienza e la responsabilità di un essere umano?**

Un buon sistema agentico non è quello in cui l’AI non può fare nulla senza di noi.

E non è neppure quello in cui facciamo partire gli agenti e spariamo.

È quello in cui sappiamo:

**quando possono agire da soli, quando devono fermarsi e quando devono chiamarci.**

Non significa rinunciare al controllo.

**Significa progettarlo.**
