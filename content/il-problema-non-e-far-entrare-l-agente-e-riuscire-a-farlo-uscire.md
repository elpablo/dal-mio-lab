---
title: "Il problema non è far entrare l’agente. È riuscire a farlo uscire"
number: 7
lang: it
date: "2026-09-22"
excerpt: "Autenticare un agente è solo l’inizio: il problema più difficile è revocare un singolo rapporto senza distruggere l’identità e gli accessi che devono rimanere attivi."
tags:
  - AI
  - Identity
  - Cybersecurity
  - Software Engineering
discussion:
  title: "Come la state affrontando voi?"
  paragraphs:
    - "Se state costruendo agenti che devono accedere a più servizi, come state gestendo identità, credenziali, revoca e sospensione?"
    - "E soprattutto: quando dovete togliere un accesso, riuscite davvero a togliere solo quello?"
  linkedinPost: "https://lnkd.in/p/dAyhgBCz"
---

# Dal mio Lab #7 <br class="mobile-title-break">— Il problema non è far entrare l’agente. È riuscire a farlo uscire

Qualche settimana fa mi ero fatto una domanda:

**[chi fa login quando l’utente è un’AI?](/articles/chi-fa-login-quando-lutente-e-un-ai)**

La domanda sembrava riguardare l’autenticazione.

In realtà, lavorandoci, ci siamo accorti abbastanza rapidamente che il login era probabilmente la parte più semplice.

La parte interessante arrivava dopo.

Un agente entra.

Gli concediamo accesso a un servizio.

Poi a un altro.

Poi a un altro ancora.

Funziona tutto.

Finché un giorno dobbiamo dire:

> Da qui non entri più.

Ed è lì che scopriamo se abbiamo progettato davvero un sistema di identità oppure soltanto un modo elegante per aprire la porta.

## Entrare è il caso felice

La maggior parte dei sistemi di autenticazione viene naturalmente progettata attorno all’ingresso.

L’utente presenta qualcosa.

Una password.

Un token.

Una chiave.

Il sistema verifica.

L’accesso viene concesso.

È un flusso importante, naturalmente.

Ma è anche il caso felice.

Il vero test arriva quando qualcosa cambia.

Una credenziale viene compromessa.

Un dispositivo non è più affidabile.

Un agente non dovrebbe più accedere a un particolare servizio.

Un’autorizzazione concessa mesi prima non ha più senso.

Oppure il comportamento dell’identità diventa problematico nel suo complesso.

A quel punto non basta più chiedersi:

> Come lo autentico?

La domanda diventa:

> **Che cosa, esattamente, voglio revocare?**

## Un’identità non è un accesso

Immaginiamo un agente che lavora con quattro servizi.

Posta.

Repository.

CRM.

Sistema di fatturazione.

A un certo punto scopriamo che la credenziale usata verso il CRM è stata compromessa.

La risposta più semplice sarebbe:

> Cambiamo tutto.

Nuove credenziali.

Nuovi accessi.

Nuova configurazione.

E magari qualche minuto passato a cercare di ricordare dove fosse stata usata quella vecchia.

Ma se il problema riguarda il CRM, perché dovremmo interrompere anche posta, repository e fatturazione?

Quello che vorremmo poter dire è molto più preciso:

> **Il rapporto tra questo agente e questo servizio non è più valido.**

Gli altri rapporti restano intatti.

Non stiamo revocando l’identità dell’agente.

Non stiamo rigenerando tutte le sue credenziali.

Non stiamo interrompendo gli accessi agli altri servizi.

Stiamo chiudendo **quel singolo rapporto**.

Sembra una differenza piccola.

Architetturalmente cambia parecchio.

## Ridurre il raggio d’impatto

Lavorando nel Lab a **un sistema di identità e autenticazione passwordless pensato anche per agenti software**, questa è diventata una delle proprietà che volevamo ottenere.

L’identità dell’agente doveva rimanere stabile.

I suoi rapporti con i servizi, invece, dovevano poter essere indipendenti.

In altre parole:

> **Un’identità può avere molti rapporti. La revoca dovrebbe poter colpire uno solo di quei rapporti senza distruggere tutto il resto.**

In termini di sicurezza significa anche limitare il raggio d’impatto di una compromissione.

Se viene compromesso un rapporto, non voglio che quella compromissione diventi automaticamente una compromissione di tutti gli altri.

Questa parte, nel nostro caso, non è più soltanto una domanda architetturale.

È una proprietà sulla quale abbiamo già lavorato concretamente e che abbiamo implementato e testato nel sistema.

Ed è anche il punto in cui compare una domanda abbastanza inevitabile.

## Quindi devo gestire una credenziale diversa per ogni servizio?

Che credenziali diverse debbano rimanere indipendenti non è certo una novità.

**Non riutilizzare la stessa password su servizi differenti è una delle regole più consolidate della sicurezza.**

Con gli agenti, però, il problema cambia scala.

Se un’identità deve poter avere rapporti indipendenti con molti servizi — e ciascuno di quei rapporti deve poter essere revocato senza influenzare gli altri — allora anche le credenziali associate a quei rapporti devono poter essere gestite indipendentemente.

E qui sembra che abbiamo semplicemente spostato il problema.

Prima avevamo una credenziale.

Adesso magari ne abbiamo dieci.

Poi cinquanta.

Poi cento.

Abbiamo davvero migliorato qualcosa?

Dipende da chi deve occuparsene.

Se la risposta è:

> l’utente deve creare, ricordare, distribuire, ruotare e revocare manualmente cento credenziali,

allora probabilmente no.

Abbiamo soltanto costruito un problema più sicuro ma molto più fastidioso.

Per noi il principio è diventato questo:

> **L’identità dovrebbe essere una. Le credenziali possono essere molte, ma non dovrebbero diventare un problema dell’agente o dell’utente.**

Ed è stato uno dei problemi meno banali che abbiamo dovuto affrontare.

Naturalmente questa frase ne apre parecchie altre.

Come vengono create?

Come vengono associate?

Come sappiamo a quale rapporto appartengono?

Come vengono sostituite?

Come vengono revocate singolarmente?

Come facciamo tutto questo senza trasformare ogni integrazione in un’attività amministrativa manuale?

Sono domande alle quali, lavorando sul sistema, abbiamo dovuto dare risposte concrete.

**Entrare nelle risposte, però, significherebbe scendere nel funzionamento tecnico del sistema — provisioning, gestione delle credenziali e protocollo — e ci porterebbe fuori dallo scope di questo articolo.**

Qui mi interessa un altro punto:

**perché il problema cambia natura appena smettiamo di considerare il login come l’unico momento importante.**

## Revocare un rapporto non significa sospendere un’identità

C’è poi un altro caso.

Finora abbiamo detto:

> questo agente non deve più accedere a questo servizio.

Ma cosa succede se il problema non riguarda il rapporto con un singolo servizio?

Supponiamo che il comportamento dell’agente — oppure dell’umano che lo controlla — diventi problematico in generale.

In quel caso la revoca selettiva non basta.

Serve un livello diverso:

> **questa identità, per il momento, non può operare.**

È una sospensione.

E sospendere un’identità è concettualmente diverso dal revocare uno dei suoi rapporti.

La prima agisce sull’attore.

La seconda su una relazione.

Questa distinzione diventa importante molto in fretta quando iniziamo ad avere agenti che lavorano in modo autonomo su più servizi.

## E se torna subito?

A quel punto arriva però una domanda ancora più scomoda.

Abbiamo sospeso l’identità.

Bene.

Cosa le impedisce di registrarsi nuovamente sullo stesso servizio e ricominciare?

Con un essere umano può essere già un problema.

Con un agente automatizzato lo diventa ancora di più.

Un sistema può creare richieste, nuovi rapporti o carico a una velocità che cambia completamente la scala del problema.

Una sospensione che può essere aggirata creando un nuovo account trenta secondi dopo è una sospensione piuttosto ottimista.

Per questo, secondo me, il problema reale non è soltanto poter dire:

> questo account è sospeso.

Bisogna poter ragionare anche su qualcosa di più forte:

> **questa identità non può ristabilire il rapporto che abbiamo appena deciso di interrompere.**

Ed è qui che autenticazione, identità e governance iniziano inevitabilmente a sovrapporsi.

## Questa parte non è ancora finita

Qui vale la pena essere precisi.

Nel nostro sistema la revoca selettiva dei rapporti è già una capacità concreta sulla quale abbiamo lavorato.

La sospensione dell’identità e il blocco della creazione di nuovi rapporti da parte di un’identità sospesa, invece, **non sono ancora operative end-to-end**.

Abbiamo già i pezzi architetturali necessari per arrivarci.

Ma avere i pezzi non significa avere una feature finita.

E questa distinzione, soprattutto quando si parla di sicurezza, per me conta parecchio.

La cosa interessante è che lavorando all’architettura ci siamo accorti presto che queste capacità non potevano essere semplicemente aggiunte alla fine come due controlli applicativi.

Dovevano essere compatibili con il modo in cui rappresentiamo l’identità e con il modo in cui quella identità stabilisce rapporti con i servizi.

Ancora una volta, il problema non era soltanto:

> cosa controlliamo?

Ma:

> **che cosa stiamo identificando?**

## Un account non basta più

Quando iniziamo a ragionare in questi termini, l’account sul singolo servizio comincia a sembrare una rappresentazione abbastanza limitata del problema.

L’account dice qualcosa su ciò che esiste **dentro quel servizio**.

Ma un agente potrebbe esistere prima di quel rapporto.

Potrebbe avere rapporti con altri servizi.

Potrebbe perderne uno e conservarne altri.

Potrebbe essere sospeso.

Potrebbe cambiare dispositivo o ambiente di esecuzione.

Potrebbe dover ristabilire alcuni rapporti senza ricostruire completamente la propria identità.

A quel punto account, credenziale e identità non possono più essere trattati come tre modi diversi per dire la stessa cosa.

Ed è probabilmente questo il cambiamento più importante che abbiamo fatto nel nostro modello mentale.

## Dal login alla governance

Quando abbiamo iniziato a lavorare su questo problema, gran parte della discussione ruotava intorno all’autenticazione.

Come dimostrare chi sei.

Come entrare.

Come evitare password.

Come stabilire fiducia.

Poi il sistema è cresciuto.

E le domande sono cambiate.

Chi possiede questa identità?

Chi le ha concesso questo accesso?

A quali servizi può accedere?

Con quali rapporti?

Cosa succede se uno viene compromesso?

Come ne revochiamo uno senza distruggere gli altri?

Quando dobbiamo sospendere l’identità?

E cosa impedisce a quell’identità di tornare semplicemente da un’altra porta?

A quel punto abbiamo smesso abbastanza rapidamente di pensare che stessimo lavorando soltanto a un sistema di login.

Stavamo lavorando sulla **governance dell’identità**.

## Non abbiamo più soltanto la domanda

Nel primo articolo mi ero fermato soprattutto sul problema:

**chi fa login quando l’utente è un’AI?**

Era una domanda.

E mi interessava capire se fosse un problema che vedevamo soltanto nel nostro Lab oppure qualcosa destinato a diventare più generale.

Nel frattempo abbiamo continuato a lavorarci.

Non considero il problema chiuso.

Ci sono ancora parti da costruire, verificare e mettere sotto pressione.

Ma oggi siamo in una posizione diversa.

**Non stiamo più soltanto chiedendoci come dovrebbe funzionare.**

Una parte significativa di quel modello l’abbiamo già costruita e testata.

E, forse ancora più interessante, lavorandoci abbiamo scoperto domande che all’inizio non avevamo nemmeno formulato.

È probabilmente questo uno degli aspetti che mi piace di più dell’architettura.

A volte inizi cercando il modo migliore per aprire una porta.

E finisci per scoprire che la domanda veramente importante era:

> **come faccio a chiuderne esattamente una, lasciando aperte tutte le altre?**
