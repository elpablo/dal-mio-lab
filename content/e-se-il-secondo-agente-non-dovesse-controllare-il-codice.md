---
title: "E se il secondo agente non dovesse controllare il codice?"
number: 10
lang: it
date: "2026-11-07"
excerpt: "Abbiamo provato a far rileggere decisioni e modifiche da un secondo agente. La parte interessante non è stata avere una seconda opinione, ma assegnargli una responsabilità diversa."
tags:
  - AI
  - AI Agents
  - Software Engineering
  - Developer Tools
socialImage: "/og-article-10.png"
discussion:
  title: "Come la state affrontando voi?"
  paragraphs:
    - "Quando usate più agenti sullo stesso progetto, assegnate loro responsabilità realmente diverse o li usate soprattutto come seconde opinioni?"
    - "E soprattutto: chi controlla il ragionamento che ha portato al codice, prima che quel ragionamento diventi semplicemente “il modo in cui il sistema funziona”?"
  linkedinPost: https://lnkd.in/p/dyQwBcj9
---

# Dal mio Lab #10 <br class="mobile-title-break">— E se il secondo agente non dovesse controllare il codice?

Qualche settimana fa, sotto [uno degli articoli di Dal mio Lab](/articles/quando-posso-lasciare-un-agente-lavorare-da-solo), qualcuno mi ha fatto una domanda molto precisa.

Avevo scritto che una modifica può compilare, passare tutti i test e rimanere comunque sbagliata per mesi.

La domanda è stata:

> **Hai trovato un modo per rendere visibili queste decisioni, tipo farle scrivere o rileggere da un altro agente?**

La mia risposta, in quel momento, era abbastanza semplice.

Non ancora.

Stavo cercando di conservare nelle issue e nei documenti Markdown le decisioni prese, i vincoli da preservare e soprattutto le alternative scartate con il motivo.

Avevo anche aggiunto:

> se riesco a rendere il secondo agente abbastanza utile da produrre segnali interessanti — e non soltanto rumore — sicuramente ne scriverò.

Nel frattempo abbiamo fatto l’esperimento.

Qualcosa ha trovato.

Ma la parte più interessante non è stata **cosa** ha trovato.

È stata capire **che cosa dovevamo chiedergli di controllare**.

## Una seconda code review non mi interessava molto

L’idea più immediata sarebbe stata semplice.

Un agente implementa.

Il secondo legge il diff.

Cerca bug.

Segnala problemi.

Fine.

È sicuramente utile.

Ma è anche qualcosa che gli strumenti stanno già diventando molto bravi a fare.

Quello che mi interessava era un problema diverso.

Nel Lab stavamo lavorando su un progetto legato a identity e security.

Nel tempo avevamo accumulato parecchio contesto: issue, documenti architetturali, decisioni approvate, vincoli, evidenze raccolte durante i test e alternative considerate ma poi scartate.

Il codice raccontava il risultato di quelle decisioni.

La documentazione raccontava anche **perché ci eravamo arrivati**.

A quel punto la domanda è diventata:

> **E se il secondo agente non controllasse soltanto il codice, ma confrontasse il nuovo lavoro con quella memoria decisionale?**

## Il primo agente aveva già fatto bene il suo lavoro

Questo punto per me è importante.

Non stavamo cercando un secondo agente perché il primo avesse fallito.

Il primo aveva analizzato il problema.

Aveva trovato failure scenario reali.

Aveva proposto possibili miglioramenti.

Il lavoro era utile.

Ma proprio perché era utile ci interessava metterlo sotto pressione.

Il secondo agente è arrivato dopo, in modalità indipendente e read-only.

Non doveva correggere nulla.

Non doveva implementare la propria soluzione.

Doveva leggere quello che sapevamo già e provare a rispondere a una domanda diversa:

> **c’è qualcosa che stiamo dando per scontato?**

Ed è qui che il risultato ha iniziato a diventare interessante.

## Non ha semplicemente trovato “altri bug”

Uno dei failure scenario già emersi nel primo passaggio riguardava un’operazione che poteva trovarsi in uno stato ambiguo quando qualcosa andava storto nel momento sbagliato.

Il secondo agente non si è limitato a confermare il problema.

Ha allargato il ragionamento.

Ha collegato quello scenario ad altre condizioni che potevano produrre conseguenze simili e ha fatto emergere un rischio ulteriore legato al modo in cui quello stato veniva conservato.

Non era:

> qui manca un `if`.

Era più vicino a:

> **se questa assunzione non è vera, quali altre parti del sistema diventano improvvisamente ambigue?**

Questa è una domanda molto diversa da una normale code review.

Ed è esattamente il tipo di domanda che speravo emergesse.

## Il valore era nel mandato, non nel secondo modello

Sarebbe facile concludere:

> Claude ha trovato qualcosa che Codex non aveva trovato.

Ma secondo me sarebbe leggere male l’esperimento.

Il punto non è stabilire quale modello sia “più bravo”.

Gli avevamo assegnato **responsabilità differenti**.

Il primo doveva comprendere il problema e portare avanti il lavoro.

Il secondo doveva cercare di rompere il ragionamento che lo sosteneva.

Se avessimo chiesto a entrambi semplicemente:

> fai una code review,

probabilmente avremmo ottenuto molto più overlap e molto meno valore.

Invece il secondo agente aveva un obiettivo diverso:

cercare assunzioni implicite, confrontare il nuovo lavoro con decisioni precedenti, individuare conseguenze non ancora considerate e distinguere ciò che era stato verificato da ciò che era soltanto una proposta.

Ed è qui che ho iniziato a pensare che forse la frase giusta non sia:

> uso due agenti.

Ma:

> **uso due responsabilità.**

## La memoria delle decisioni cambia la review

Questo esperimento avrebbe avuto molto meno valore se il secondo agente avesse avuto soltanto il repository.

Nel tempo avevamo iniziato a riportare nelle issue e nei documenti architetturali non soltanto:

> abbiamo deciso X.

Ma anche:

> abbiamo scelto X perché Y.

E, quando importante:

> avevamo considerato Z, ma lo abbiamo scartato per questo motivo.

Queste informazioni cambiano radicalmente ciò che un reviewer può fare.

Senza di esse, una vecchia alternativa può sembrare una nuova buona idea.

Con esse, l’agente può chiedersi:

> **questa modifica sta reintroducendo qualcosa che avevamo già deciso di non fare?**

Oppure:

> **il motivo per cui avevamo preso quella decisione è ancora valido?**

La seconda domanda è ancora più interessante.

Perché la memoria decisionale non dovrebbe diventare una religione.

Una scelta fatta sei mesi fa può essere stata corretta allora e non esserlo più oggi.

Il punto è sapere che quella scelta **esisteva** e perché era stata presa.

Solo così possiamo decidere consapevolmente di cambiarla.

## Fatti, rischi e proposte non sono la stessa cosa

Durante la review abbiamo trovato utile separare molto chiaramente categorie che spesso finiscono mischiate.

Una cosa è:

> questo comportamento esiste e lo abbiamo verificato.

Un’altra è:

> questo comportamento crea un rischio in questo scenario.

Un’altra ancora:

> potremmo risolverlo in questo modo.

Sembrano distinzioni banali.

Ma quando un agente produce una review molto convincente, è sorprendentemente facile leggere una proposta ben argomentata come se fosse già una decisione.

Per questo abbiamo cercato di mantenere separate **evidenza, rischio e soluzione proposta**.

Le proposte del secondo agente non diventavano automaticamente nuove decisioni architetturali.

Entravano nel processo.

Poi venivano valutate.

## E il secondo agente può sbagliare

Questa è probabilmente la parte che preferisco dell’esperimento.

Perché sarebbe stato molto comodo concludere:

> perfetto, abbiamo aggiunto Claude e adesso abbiamo un sistema di review infallibile.

Naturalmente non è successo.

In uno dei passaggi successivi, mentre stavamo trasformando il lavoro di review in una issue strutturata, il controllo umano ha trovato una sezione incompleta.

Parte del contesto era stata troncata.

C’erano riferimenti da verificare.

E una distinzione importante sugli esiti incerti non era stata rappresentata abbastanza bene.

Se avessimo trattato l’output del secondo agente come verità semplicemente perché proveniva dal “reviewer”, avremmo inserito nella memoria del progetto informazioni incomplete.

Quindi il secondo agente aveva migliorato il controllo sul primo.

E l’umano ha migliorato il controllo sul secondo.

Non è esattamente l’automazione totale promessa nei diagrammi più ottimisti.

Ma funziona molto meglio.

## Non voglio un arbitro

Questo mi ha chiarito anche cosa **non** voglio dal secondo agente.

Non voglio che diventi l’autorità che stabilisce chi ha ragione.

Non voglio nemmeno che proponga continuamente una nuova architettura soltanto perché può farlo.

E non voglio trasformare ogni modifica in una riunione tra cinque modelli che producono venti alternative.

Voglio qualcosa di molto più specifico.

Il primo agente costruisce.

Il secondo mette sotto pressione il ragionamento.

L’umano decide quali osservazioni modificano realmente il modello del progetto.

Se durante il processo emerge una nuova decisione, quella decisione torna nella memoria condivisa.

E il ciclo può ricominciare.

## La review migliore potrebbe non produrre nessuna modifica

C’è anche un risultato apparentemente poco spettacolare che considero molto utile.

Il secondo agente potrebbe leggere tutto.

Confrontare l’implementazione con i vincoli.

Controllare le alternative precedenti.

E concludere:

> non vedo ragioni per cambiare questa decisione.

Zero nuove righe di codice.

Zero issue.

Zero fix.

Potrebbe comunque essere una review ottima.

Perché il suo valore non sta nel numero di problemi che trova.

Sta nella capacità di aumentare la nostra fiducia sul fatto che **abbiamo guardato il problema anche da un’altra responsabilità**.

Questo è importante anche per evitare un incentivo perverso.

Se misuriamo un reviewer dal numero di finding, prima o poi inizierà a produrre finding perché è quello che gli stiamo chiedendo implicitamente di massimizzare.

A me interessa il segnale.

Non il volume.

## Il problema del rumore

Era anche il dubbio che avevo quando avevo risposto al commento originale.

Un secondo agente è facile da aggiungere.

Renderlo utile è un’altra cosa.

Può contestare qualsiasi decisione.

Può proporre alternative plausibili all’infinito.

Può trasformare ogni trade-off in un problema aperto.

Può trovare cento cose tecnicamente vere e operativamente irrilevanti.

A quel punto non abbiamo aumentato la qualità.

Abbiamo semplicemente costruito un generatore automatico di riunioni.

Per ora il criterio che mi sembra funzionare è restringere molto il mandato.

Non:

> trova tutto ciò che cambieresti.

Ma:

> **cerca ciò che potrebbe rendere falsa una decisione che stiamo per considerare valida.**

La differenza è piccola nella formulazione.

Nel risultato, parecchio meno.

## Forse la code review arriva troppo tardi

Questo esperimento mi ha fatto anche ripensare al termine *code review*.

Se il problema è:

> il codice implementa correttamente la decisione?

la code review va benissimo.

Ma molti problemi interessanti arrivano prima:

> **la decisione che stiamo implementando continua a essere quella giusta?**

Quando la risposta è no, discutere la qualità dell’implementazione diventa quasi secondario.

Possiamo avere codice magnifico che implementa perfettamente una scelta sbagliata.

E torniamo al problema da cui era partito il commento originale:

> passa tutti i test.

> non si vede per mesi.

Forse alcune review dovrebbero quindi iniziare **prima del diff**.

## Due agenti non significano automaticamente più intelligenza

C’è un’altra tentazione che vorrei evitare.

Aggiungere un secondo agente non rende automaticamente il processo migliore.

Due agenti con lo stesso contesto, lo stesso obiettivo e gli stessi incentivi possono semplicemente produrre due versioni molto simili della stessa risposta.

Il valore che abbiamo visto nasceva soprattutto dalla differenza di ruolo.

Il primo era orientato a far avanzare il lavoro.

Il secondo era orientato a cercare ciò che poteva invalidarlo.

Questa asimmetria mi sembra molto più importante del numero di agenti.

> **Il valore del secondo agente non è avere una seconda opinione. È avere una seconda responsabilità.**

Questa è probabilmente la cosa principale che mi porto via dall’esperimento.

## La memoria resta il pezzo fondamentale

C’è però una condizione.

Se voglio che il secondo agente controlli il ragionamento, quel ragionamento deve esistere da qualche parte.

Non possiamo chiedergli di verificare decisioni che sono rimaste soltanto nella nostra testa.

Le issue, i documenti Markdown, gli acceptance criteria, le alternative scartate e le evidenze degli esperimenti stanno diventando quindi qualcosa di più della documentazione del progetto.

Stanno diventando **materiale operativo per gli agenti successivi**.

Non documentiamo soltanto ciò che è stato costruito.

Documentiamo abbastanza del percorso da permettere a qualcun altro — umano o artificiale — di metterlo nuovamente in discussione.

È una differenza che sto iniziando a considerare piuttosto importante.

## Avevo promesso che ne avrei scritto

Qualche settimana fa mi era stato chiesto:

> se il secondo agente funziona, ci farebbe piacere sapere cosa trova.

La risposta breve è:

**sì, qualcosa ha trovato.**

Ma dopo aver fatto l’esperimento, la parte che trovo più interessante non è l’elenco dei finding.

È aver capito che non avevamo bisogno semplicemente di un’altra code review.

Avevamo bisogno di qualcuno con un mandato differente.

Qualcuno che non chiedesse soltanto:

> **questo codice funziona?**

Ma anche:

> **il ragionamento che ci ha portati a scriverlo regge ancora?**

Per ora non ho intenzione di togliere l’umano da questo ciclo.

Anzi.

Più diventano bravi gli agenti a costruire e criticare, più trovo utile decidere con precisione **quale responsabilità sto delegando a ciascuno**.

Forse il prossimo passo non è creare agenti che facciano tutti la stessa cosa meglio.

È creare un processo in cui ognuno abbia un motivo diverso per dirci:

> **aspettate un attimo.**

---

## Come la state affrontando voi?

Quando usate più agenti sullo stesso progetto, assegnate loro responsabilità realmente diverse o li usate soprattutto come seconde opinioni?

E soprattutto:

**chi controlla il ragionamento che ha portato al codice, prima che quel ragionamento diventi semplicemente “il modo in cui il sistema funziona”?**
