---
title: "Un agente sa scrivere codice. Ma sa perché lo sta scrivendo?"
number: 8
lang: it
date: "2026-10-06"
excerpt: "Un agente può leggere tutto il repository e modificare correttamente il codice. Ma il repository non contiene necessariamente il ragionamento che ci ha portati fin lì."
tags:
  - AI
  - AI Agents
  - Software Engineering
  - Developer Tools
socialImage: "/og-article-8.png"
discussion:
  title: "Come la state affrontando voi?"
  paragraphs:
    - "Quando usate agenti AI su codebase reali, dove conservate il contesto che non vive nel codice?"
    - "E soprattutto: come fate a evitare che una decisione già presa venga “riscoperta” da zero sei mesi dopo?"
---

# Dal mio Lab #8 <br class="mobile-title-break">— Un agente sa scrivere codice. Ma sa perché lo sta scrivendo?

Un agente può leggere centomila righe di codice.

Può trovare una classe.

Seguire una chiamata.

Individuare tutti i punti in cui viene usata.

Può modificare cinque file, aggiornare i test e farli passare tutti.

E può comunque non sapere la cosa più importante:

> **perché quel codice è fatto così.**

È un problema che abbiamo incontrato sempre più spesso lavorando con agenti AI su progetti reali.

Il repository contiene tantissime informazioni.

Ma non necessariamente contiene la storia delle decisioni che hanno prodotto quel repository.

E spesso è proprio quella storia a fare la differenza tra una modifica corretta e una modifica soltanto plausibile.

## Il codice racconta cosa. Non sempre perché.

Immaginiamo di trovare nel codice un controllo apparentemente ridondante.

Una condizione che sembra poter essere semplificata.

Un parametro che potrebbe essere eliminato.

Una funzione che sembra duplicarne un’altra.

Guardando soltanto il codice, la soluzione può sembrare evidente:

> ripuliamo.

Magari anche i test continuano a passare.

Il problema è che quella stranezza potrebbe essere lì perché sei mesi prima avevamo scoperto un caso limite.

Oppure perché un cliente aveva imposto una regola particolare.

Oppure perché avevamo già provato l’implementazione apparentemente più elegante e aveva creato un problema altrove.

Queste informazioni non sono necessariamente nel codice.

A volte sono in una issue.

A volte in un commento.

A volte nella cronologia Git.

A volte in una conversazione.

E, nel peggiore dei casi, soltanto nella testa della persona che aveva preso quella decisione.

Il repository contiene lo stato attuale del software.

> **Non necessariamente contiene il ragionamento che lo ha portato fin lì.**

## Con gli agenti il problema diventa molto visibile

Con uno sviluppatore umano questa situazione esiste da sempre.

Chi entra in un progetto maturo passa settimane — spesso mesi — a costruirsi un modello mentale del sistema.

Fa domande.

Scopre convenzioni.

Impara quali parti sono fragili.

Capisce quali decisioni sembrano strane ma hanno una storia.

Un agente può attraversare il repository enormemente più velocemente.

Ma la velocità con cui legge il codice non gli conferisce automaticamente quella storia.

E questo crea una situazione curiosa.

L’agente può essere tecnicamente molto competente e contemporaneamente prendere una decisione perfettamente razionale partendo da premesse incomplete.

Non è necessariamente un errore di reasoning.

Può essere semplicemente un errore di **contesto**.

## “Ma gli ho dato tutto il repository”

È una frase che sembra risolvere il problema.

In realtà non sempre lo fa.

Avere accesso all’intero repository significa poter vedere moltissimo.

Non significa sapere automaticamente che cosa conta.

Ancora meno significa conoscere informazioni che nel repository non sono mai entrate.

In un articolo precedente, [**“Ottimizzare il contesto non significa comprimere di più”**](/articles/ottimizzare-il-contesto-non-significa-comprimere-di-piu), avevo raccontato alcuni esperimenti su come dare contesto agli agenti in modo più efficiente.

Lì la domanda era soprattutto:

> quanto contesto dobbiamo inviare?

Lavorando quotidianamente con questi strumenti, però, mi sembra che ce ne sia una precedente:

> **quale contesto dovrebbe esistere?**

Perché possiamo avere il sistema di retrieval più sofisticato del mondo.

Ma non può recuperare una decisione che non abbiamo mai scritto da nessuna parte.

## Una issue può essere parte dell’architettura

Per molto tempo ho considerato le issue soprattutto strumenti di organizzazione.

Descrivono cosa bisogna fare.

Permettono di assegnare il lavoro.

Registrano lo stato.

Chiusa l’issue, avanti con la successiva.

Lavorando con gli agenti ho iniziato a considerarle in modo un po’ diverso.

Una buona issue può diventare una piccola unità di **memoria tecnica del progetto**.

Non soltanto:

> aggiungere questa funzione.

Ma:

- qual è il problema reale;
- quali sono i vincoli;
- quali casi devono essere preservati;
- quali alternative abbiamo considerato;
- quali abbiamo scartato e perché;
- quali sono i criteri con cui considereremo il lavoro corretto.

A quel punto il documento non serve soltanto all’agente che eseguirà il task oggi.

Serve anche al prossimo agente.

Al prossimo sviluppatore.

E, molto spesso, a noi stessi tra sei mesi.

## Il “perché” cambia il modo in cui deleghi

Questa cosa ha cambiato anche il modo in cui lavoriamo nel Lab.

Cerchiamo sempre più spesso di non dare a un agente soltanto:

> modifica questa parte.

Prima proviamo a chiarire due cose:

> **qual è davvero il problema?**

e:

> **che cosa deve essere vero alla fine perché possiamo considerarlo risolto?**

In mezzo stanno i vincoli, le decisioni già prese e ciò che non deve cambiare.

Solo dopo arriva l’implementazione.

Sembra un rallentamento.

In realtà spesso succede il contrario.

Perché l’agente passa molto meno tempo a produrre soluzioni corrette per il problema sbagliato.

## I test non possono raccontare tutto

Anche questa è una tentazione interessante.

Se abbiamo una buona suite di test, possiamo lasciare che sia quella a definire il comportamento.

Ed è vero fino a un certo punto.

I test sono una forma potentissima di contesto eseguibile.

Dicono:

> questo comportamento deve continuare a funzionare.

Ma non sempre dicono:

> **perché** deve funzionare così.

E soprattutto non possono testare ciò che non abbiamo ancora pensato di testare.

Un agente può modificare il sistema.

Tutti i test rimangono verdi.

E la modifica può comunque violare una decisione architetturale che nessun test rappresentava.

Il verde è un segnale importante.

Non è una spiegazione.

## Il problema delle decisioni invisibili

Le decisioni più pericolose da perdere sono spesso quelle che non hanno prodotto molto codice.

Abbiamo valutato una possibilità.

Ci siamo accorti di una conseguenza.

Abbiamo deciso di non percorrerla.

E quindi nel repository non esiste nulla che racconti quella strada.

Per il prossimo agente, quella possibilità torna improvvisamente ad apparire nuova.

E magari anche molto elegante.

Questo è uno dei motivi per cui sto iniziando a considerare importante conservare non soltanto:

> cosa abbiamo fatto.

Ma anche:

> **cosa abbiamo deciso di non fare, e perché.**

Altrimenti ogni nuova sessione rischia di riscoprire le stesse idee e gli stessi problemi.

Il software ricorda il risultato.

Non necessariamente ricorda gli errori evitati.

## Più autonomia richiede più contesto

Qui secondo me c’è un punto interessante.

Quando un agente lavora su una modifica molto piccola, possiamo tenerlo vicino.

Gli diamo una richiesta.

Guardiamo cosa fa.

Correggiamo la direzione.

Iteriamo.

Ma più vogliamo aumentare la sua autonomia, più diventa importante che le informazioni necessarie alla decisione siano disponibili **prima** che quella decisione venga presa.

Non basta dare più tool.

Non basta aumentare il context window.

Non basta permettergli di leggere tutto il repository.

L’autonomia utile richiede anche che una parte del modello mentale del progetto sia diventata esplicita.

Altrimenti stiamo semplicemente dando più libertà a qualcuno che conosce meno storia di noi.

## Non tutto il contesto ha lo stesso valore

Questo non significa documentare qualsiasi cosa.

Un progetto in cui ogni decisione genera dieci pagine di documentazione probabilmente ha soltanto spostato il problema.

Il contesto utile, almeno per quello che sto osservando, è quello che modifica una decisione futura.

Per esempio:

> questa scelta esiste perché dobbiamo preservare questo comportamento.

Oppure:

> abbiamo provato l’approccio A, ma falliva in questo scenario.

Oppure:

> questo componente sembra duplicato, ma appartiene a un lifecycle diverso.

Queste informazioni valgono molto più di una descrizione dettagliata di ciò che il codice può già raccontare da solo.

## Il repository non dovrebbe essere l’unica memoria del progetto

Più lavoriamo con agenti AI, più mi sembra che stia emergendo una distinzione utile.

Il repository è la memoria del **software**.

Issue, decisioni, acceptance criteria, esperimenti e ragionamenti sono parte della memoria dell’**engineering**.

Le due cose si sovrappongono.

Ma non coincidono.

E forse il passo successivo non è semplicemente costruire agenti capaci di leggere repository sempre più grandi.

È costruire un ambiente in cui possano ricostruire anche:

> **perché siamo arrivati qui.**

## La qualità del contesto si vede quando evita una modifica

C’è una metrica curiosa che difficilmente compare in una dashboard.

Un agente legge una decisione precedente.

Capisce perché una soluzione apparentemente migliore era stata scartata.

E decide di **non modificare** qualcosa.

Nessuna riga aggiunta.

Nessun commit spettacolare.

Nessun benchmark migliorato.

Ma magari abbiamo appena evitato due giorni di regressioni.

In quei casi il contesto ha fatto esattamente il suo lavoro.

Non ha aiutato l’agente a scrivere più codice.

> **Gli ha impedito di scrivere quello sbagliato.**

## Forse stiamo documentando per un lettore nuovo

Per anni abbiamo scritto documentazione pensando soprattutto alle persone.

Oggi una parte crescente di quella documentazione può essere letta anche da agenti.

Questo cambia leggermente il modo in cui la guardo.

Non significa scrivere documenti “per l’AI”.

Significa rendere esplicite informazioni che erano già importanti, ma che spesso lasciavamo implicite perché confidavamo nella memoria del team.

Gli agenti rendono quella dipendenza molto più evidente.

E, paradossalmente, migliorare il contesto per loro può migliorare anche il progetto per gli esseri umani.

Una decisione scritta bene non serve soltanto a Codex.

Serve anche al nuovo collega.

Serve a chi farà manutenzione tra un anno.

Serve a noi quando avremo dimenticato metà delle ragioni per cui abbiamo fatto quello che abbiamo fatto.

## Sapere come non basta

Gli agenti stanno diventando rapidamente molto bravi a capire **come** modificare il software.

Dove intervenire.

Quali file cambiare.

Come adattare i test.

Come compilare.

Come verificare il risultato.

Ma nei progetti reali una parte importante dell’ingegneria vive ancora in un’altra domanda:

> **perché?**

Perché questa regola esiste?

Perché una soluzione apparentemente migliore è già stata scartata?

Se vogliamo agenti sempre più autonomi, credo che dovremo diventare più bravi a rendere disponibili anche quelle risposte.

Perché un agente può sapere perfettamente **come scrivere il codice**.

La vera domanda è se sa **perché lo sta scrivendo**.
