L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
Ogni cella ha un numero progressivo, da 1 a 100.
Ci saranno quindi 10 caselle per ognuna delle 10 righe.
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.
Bonus
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
- con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
- con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
- con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;


# Campo minato con JS

Questo programma in JS simula il famoso gioco Campo Minato. 

## Descrizione del Codice parte 1 - Griglia

1- L'utente clicca su un bottone che genera una griglia di gioco

<button id="play">Play</button>


    const playButton = document.getElementById("play");
    playButton.addEventListener("click", function() {
        // funzione per creare la griglia
    });

2- Ogni cella generata ha un numero progressivo da 1 a 100. Si può creare una funzione che serve per generare elementi. 

function createElement(tag, className, content) {
    const element = document.createElement(tag);
    element.classList.add(className);
    element.append(content);
    return element;
}

for (let i = 1; i <= 100; i++) {
    const myElement = createElement("div", "cell", i);
}

3- Quando l'utente clicca su una cella, la cella si colora di azzurro e emette un messaggio in console con il numero della cella cliccata.

.blue {
    background-color: #598CE3;
}

Ad ogni celle creata ci sarò un event listener che al click aggiungerà la classe blue.


Quando si crea il board bisogna già avere tutti gli elementi, la tavola di gioco deve già avere tutte le informazioni. Le operazioni che facciamo devono avere un ordine logico che il board è l'ultima cosa che creiamo prima di iniziare il gioco.

## Descrizione del Codice parte 2 - Il Gioco

1- Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta

//funzione genera bombe
function generateBombs(level) {
  let maxNumber;
  switch (level) {
    case 1:
      maxNumber = 100;
      break;
    case 2:
      maxNumber = 81;;
      break;
    case 3:
      maxNumber = 49;
      break;
  }
  const bombs = [];
  while (bombs.length < 16) {
    const randomNum = Math.floor(Math.random() * maxNumber) + 1;
    bombs.push(randomNum);
  }
  console.log(bombs);
  return bombs;
}

2- Nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.

    if (!bombs.includes(randomNum)) {
      bombs.push(randomNum);
    }

3- In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. 


Attenzione: 
In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
BONUS:
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
- difficoltà 1 ⇒ 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
- difficoltà 2 ⇒ 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
- difficoltà 3 ⇒ 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;
Superbonus 1
Quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle.
Superbonus 2
Quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste.