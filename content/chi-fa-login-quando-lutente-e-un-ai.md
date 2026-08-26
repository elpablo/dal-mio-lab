---
title: "Chi fa login quando l’utente è un’AI?"
number: 3
date: "2026-08-25"
excerpt: "Gli agenti AI stanno iniziando ad agire davvero per conto nostro. Ma quando accedono a un servizio, chi si sta autenticando: noi, l’agente o entrambi?"
tags:
  - AI
  - Authentication
  - Software Engineering
socialImage: "/og-article-3.png"
---

# Dal mio Lab #3 <br class="mobile-title-break">— Chi fa login quando l’utente è un’AI?

Per anni abbiamo progettato sistemi di autenticazione dando per scontata una cosa abbastanza semplice:

**dall’altra parte c’è una persona.**

Una persona apre un sito.

Inserisce una password.

Conferma un codice.

Tocca il sensore biometrico.

Preme “Continua con Google”.

In un modo o nell’altro, alla fine c’è sempre un essere umano che dice:

> Sì, sono io.

Poi abbiamo iniziato a costruire agenti AI.

E improvvisamente quella premessa ha cominciato a scricchiolare.

## Quando l’AI non si limita più a rispondere

Finché un modello riceve una domanda e restituisce del testo, il problema è relativamente semplice.

L’utente è ancora chiaramente la persona davanti allo schermo.

Ma gli agenti stanno iniziando a fare qualcosa di diverso.

Possono:

- chiamare API;
- leggere e modificare documenti;
- creare issue;
- lavorare su repository;
- prenotare servizi;
- interrogare sistemi aziendali;
- coordinarsi con altri agenti;
- continuare a lavorare quando l’utente non è più davanti al computer.

A quel punto nasce una domanda apparentemente banale:

**chi si sta autenticando?**

Io?

Il mio agente?

Entrambi?

## Un esempio molto semplice

Immaginiamo che io abbia un agente AI personale.

Gli chiedo:

> Controlla le mie attività aperte, verifica cosa è cambiato nei repository e prepara quello che serve per domani.

Per svolgere questo compito deve accedere a diversi servizi.

GitHub.

Un task manager.

Magari Google Drive.

Forse una piattaforma aziendale.

Come dovrebbe autenticarsi?

Potrei dargli le mie credenziali.

Già questa frase dovrebbe creare un leggero disagio. 😄

Potrei creare un account separato.

Ma allora quell’account chi rappresenta?

L’agente?

Me?

Un agente che lavora per me?

Potrei usare API key.

Ma a quel punto devo gestire chiavi, scope, scadenze e revoche per ogni servizio.

OAuth?

Probabilmente in molti casi sì.

Ma anche lì resta una domanda più profonda:

**il servizio sta autorizzando me o sta autorizzando un software ad agire per conto mio?**

Sembrano la stessa cosa.

Non lo sono.

## Identità e autorizzazione sono due problemi diversi

Supponiamo che un servizio riesca a riconoscere perfettamente il mio agente.

Fantastico.

Sappiamo che è lui.

Ma non sappiamo ancora:

- chi lo controlla;
- per conto di chi sta agendo;
- cosa può fare;
- su quali risorse;
- per quanto tempo;
- se può delegare parte del lavoro;
- cosa succede quando quella delega termina.

Sapere **chi sei** non significa sapere **cosa puoi fare**.

E sapere cosa puoi fare non significa sapere **per conto di chi lo stai facendo**.

Con le persone tendiamo spesso a comprimere queste informazioni in un unico concetto: l’account.

Con gli agenti AI temo che questa scorciatoia inizierà a funzionare sempre meno.

## “Questo è Paolo” non è uguale a “questo agente lavora per Paolo”

Questa distinzione, secondo me, diventerà fondamentale.

Un servizio potrebbe ricevere una richiesta e sapere che proviene da un agente appartenente a Paolo.

Ma questo non dovrebbe automaticamente significare:

> trattalo come Paolo.

Potrei voler autorizzare un agente a leggere il mio calendario.

Non a cancellarlo.

Potrei permettergli di creare una pull request.

Non di fare merge.

Potrei permettergli di prenotare un hotel entro un determinato budget.

Non di acquistare qualsiasi cosa utilizzando il mio metodo di pagamento.

Quindi la domanda cambia.

Non basta più chiedersi:

> Chi è questo utente?

Dovremo probabilmente iniziare a chiedere:

> **Chi è questa entità, per conto di chi sta agendo e cosa è autorizzata a fare in questo momento?**

Sono tre informazioni diverse.

## E se gli agenti cominciano a delegare?

Qui la faccenda diventa ancora più divertente. 😄

Immaginiamo che il mio agente principale debba organizzare un viaggio.

Potrebbe delegare la ricerca dei voli a un agente.

Gli hotel a un altro.

La verifica del calendario a un terzo.

A quel punto abbiamo una piccola catena:

**io → agente principale → agente specializzato**

Chi autorizza l’ultimo agente?

Deve ricevere direttamente una mia autorizzazione?

Può riceverla dall’agente principale?

Può delegarla ulteriormente?

Per quanto tempo?

Come faccio a revocare soltanto un ramo della catena senza bloccare tutto?

E soprattutto:

**come può il servizio che riceve la richiesta verificare questa catena senza fidarsi semplicemente di quello che l’agente dichiara?**

In un sistema distribuito, “fidati di me, Paolo ha detto che posso farlo” non mi sembra un protocollo particolarmente promettente. 😄

## Poi ci sono i dispositivi

Un’altra cosa che oggi diamo spesso per scontata è il dispositivo.

Io posso autenticarmi dal mio telefono.

Dal portatile.

Da un computer nuovo.

Posso perderne uno e revocarlo.

Posso aggiungerne un altro.

Ma cosa succede a un agente?

Può vivere sul mio laptop oggi e su un server domani.

Può essere eseguito in locale.

In cloud.

Su un nodo AI domestico.

Può cambiare macchina senza cambiare identità?

La sua identità appartiene al processo che sta girando?

Alla macchina?

Al proprietario?

A un profilo?

A una chiave crittografica?

E se il dispositivo viene compromesso, come distinguiamo il dispositivo compromesso dall’identità dell’agente?

Sono domande che nei normali flussi di login spesso non dobbiamo nemmeno porci.

Con gli agenti diventano difficili da evitare.

## Service account e API key risolvono davvero il problema?

Naturalmente non stiamo partendo da zero.

I sistemi informatici gestiscono identità non umane da moltissimo tempo.

Service account.

API key.

Client credential.

Certificati.

Token.

OAuth.

Quindi una prima risposta potrebbe essere:

> Abbiamo già tutti gli strumenti necessari.

Forse.

Ma ho il sospetto che ci sia una differenza importante.

Un service account tradizionale rappresenta normalmente **un servizio**.

Un agente AI può invece rappresentare qualcosa di molto più ambiguo:

un software con una propria identità che, in momenti diversi, può operare per conto di persone diverse, con permessi diversi e con diversi livelli di autonomia.

Non è semplicemente:

**machine-to-machine.**

C’è una relazione di delega.

E quella relazione potrebbe diventare importante quanto l’identità stessa.

## E MCP?

Una parte di questo problema sta già iniziando a essere affrontata.

Il **Model Context Protocol (MCP)** sta diventando uno dei principali standard attraverso cui modelli e agenti possono scoprire e utilizzare strumenti, risorse e servizi.

Nel tempo il protocollo ha rafforzato anche la parte relativa all’autorizzazione, integrandosi con meccanismi come OAuth e affrontando in modo sempre più esplicito il rapporto tra client, authorization server e resource server.

Questo è importante.

MCP può aiutare a standardizzare **come un agente accede a uno strumento** e come ottiene l’autorizzazione necessaria per utilizzarlo.

Ma resta una domanda più ampia:

> **Chi è l’agente che sta utilizzando quello strumento, a chi appartiene e per conto di chi sta agendo?**

Le due cose non sono necessariamente alternative.

Potrebbero semplicemente essere due livelli dello stesso problema.

MCP può dirci come un agente chiama in modo standard un tool GitHub.

OAuth può stabilire quali permessi possiede.

Ma potremmo avere ancora bisogno di sapere che:

- quell’agente appartiene a Paolo;
- sta agendo per conto di Paolo;
- può creare una pull request;
- non può fare merge;
- quella delega è valida soltanto per un certo periodo;
- non può necessariamente trasferire quella stessa autorità a un altro agente.

La domanda che mi interessa, quindi, non è:

> MCP risolve o non risolve il problema?

È piuttosto:

> **MCP + OAuth sono sufficienti a rappresentare anche identità, ownership e delega degli agenti, oppure manca ancora uno strato?**

Ed è una delle domande su cui sarei particolarmente curioso di sentire opinioni da chi sta già costruendo sistemi di questo tipo.

## E la responsabilità?

Poi c’è la domanda che prima o poi arriva sempre.

Un agente compie un’azione sbagliata.

Chi l’ha fatta?

L’agente?

Il proprietario dell’agente?

La persona che gli ha dato l’istruzione?

Il sistema che gli ha concesso l’autorizzazione?

In molti casi la risposta giuridica dipenderà dal contesto.

Ma dal punto di vista tecnico abbiamo comunque bisogno di poter ricostruire cosa è successo.

Non basta sapere:

> questa API è stata chiamata alle 10:42.

Potrebbe essere molto più utile sapere:

> questo agente, appartenente a questo soggetto, ha effettuato questa operazione sulla base di questa autorizzazione.

Identità, ownership, delega e audit iniziano a intrecciarsi.

Ed è qui che il problema diventa molto più grande del semplice login.

## Forse stiamo usando una parola troppo piccola

All’inizio tendevo a pensare a tutto questo come a un problema di autenticazione.

Continuo a pensare che l’autenticazione sia una parte importante.

Ma più ci ragiono, più mi sembra che la parola sia troppo piccola.

Il vero problema potrebbe essere qualcosa del genere:

**identity + ownership + authorization + delegation.**

Chi sei.

A chi appartieni.

Per conto di chi stai agendo.

Cosa puoi fare.

Chi ti ha concesso quel diritto.

E come può quel diritto essere revocato.

Con gli esseri umani abbiamo costruito queste cose progressivamente nel corso di decenni.

Con gli agenti AI stiamo cercando di assemblarle mentre gli agenti diventano sempre più capaci.

## Nel Lab questa domanda ci sta portando abbastanza lontano

Negli ultimi mesi, nel Lab, stiamo lavorando parecchio su autenticazione, identità e ownership.

Era nato da una domanda molto più semplice:

> Possiamo rendere l’autenticazione passwordless più semplice e naturale?

Ma lavorandoci sono comparsi progressivamente concetti che all’inizio non avevamo previsto con la stessa importanza.

Profili.

Ownership.

Dispositivi.

Servizi.

Identità non umane.

Governance.

Delegazione.

Ed è stato difficile non vedere il collegamento con quello che sta succedendo nel mondo degli agenti AI.

Non so ancora quale sia la risposta giusta a questo problema.

E, soprattutto, non voglio partire assumendo che lo sia.

Prima mi interessa capire una cosa molto più importante:

**il problema esiste davvero fuori dal nostro Lab?**

## Come la state affrontando voi?

Se state costruendo agenti AI, sistemi multi-agent o servizi che in futuro potrebbero essere utilizzati direttamente da agenti, sono davvero curioso di capire come state affrontando queste domande.

Come autenticate gli agenti?

Usate account separati?

Service account?

OAuth?

API key?

MCP?

Come rappresentate la relazione tra agente e persona?

Come gestite la delega?

E cosa succede quando un agente deve agire su più servizi diversi?

Non sto cercando la risposta “giusta”.

Mi interessano soprattutto i problemi che avete incontrato.

Perché forse tra qualche anno sarà completamente normale che un servizio debba capire la differenza tra:

**“questo è Paolo”**

e

**“questo è un agente autorizzato da Paolo a fare questa cosa, su questa risorsa, fino a questo momento.”**

E se davvero stiamo andando in quella direzione, credo valga la pena iniziare a parlarne adesso.

<aside class="discussion-cta" aria-labelledby="discussion-heading">
  <h3 id="discussion-heading">Come la state affrontando voi?</h3>
  <p>Questo articolo nasce anche per aprire una discussione.</p>
  <p>Se state costruendo agenti AI, sistemi multi-agent o servizi che dovranno essere utilizzati da AI, mi interessa sapere come state gestendo identità, autenticazione e delega.</p>
  <a href="https://lnkd.in/p/dxi4b2Wn" target="_blank" rel="noopener noreferrer">
  Partecipa alla conversazione su LinkedIn →
  </a>
</aside>
