"use strict";

// functions

//funzione crea elementi
function createElement(tag, className, content) {
  const element = document.createElement(tag);
  element.classList.add(className);
  element.append(content);
  return element;
}

//funzione resetta board
function resetBoard() {
  document.getElementById("board").innerHTML = "";
}

//funzione genera bombe
function generateBombs(level) {
  const bombs = [];
  let maxNumber;
  switch (level) {
    case 1:
      maxNumber = 100;
      break;
    case 2:
      maxNumber = 81;
      break;
    case 3:
      maxNumber = 49;
      break;
  }
  while (bombs.length < 16) {
    const randomNum = Math.floor(Math.random() * maxNumber) + 1;
    if (!bombs.includes(randomNum)) {
      bombs.push(randomNum);
    }
  }
  bombs.sort((a, b) => a - b);
  return bombs;
}

//funzione esito del click
function checkBomb(cellNumber, bombs) {
  if (bombs.includes(cellNumber)) {
    console.log("BOOM! Game over.");
  } else {
    console.log("You are safe!");
  }
}

//funzione determina numero celle
function setCellNumber(level) {
  let cellNumber;
  switch (level) {
    case 2:
      cellNumber = 81;
      break;

    case 3:
      cellNumber = 49;
      break;

    case 1:
    default:
      cellNumber = 100;
      break;
  }

  return cellNumber;
}

//funzione counter
function counter() {
  const clickedCells = document.querySelectorAll(".blue").length;
  document.getElementById(
    "game-info"
  ).textContent = `Il tuo punteggio è: ${clickedCells}`;
}

//funzione end game
function endGame() {
  const clickedCells = document.querySelectorAll(".blue").length;
  const totalCells = document.querySelectorAll(".cell").length;
  console.log(clickedCells, totalCells);
  if (clickedCells === totalCells - 16) {
    const infoDiv = document.getElementById("game-info");
    const h2 = createElement("h2", "winner", "Hai vinto!");
    infoDiv.appendChild(h2);
    gameEnded = true;
  }
}

//funzione per marcare le bombe
function markBomb(element) {
  element.classList.add("bomb");
}

//funzione crea board
function createBoard(mainElement, cellNumber) {
  const cells = Math.sqrt(cellNumber);
  const level = parseInt(document.getElementById("difficolta").value);
  const bombs = generateBombs(level);
  console.log(bombs);
  const fragment = document.createDocumentFragment();

  for (let i = 1; i <= cellNumber; i++) {
    const myElement = createElement("div", "cell", i);
    myElement.classList.add(`cell-${cells}`);
    if (bombs.includes(i)) {
      markBomb(myElement);
    }
    myElement.addEventListener("click", function () {
      if (gameEnded) {
        return;
      }
      console.log(`Cell ${i} clicked!`);
      checkBomb(i, bombs);
      if (bombs.includes(i)) {
        //querySelectorAll restituisce un array di elementi
        document.querySelectorAll(".bomb").forEach((element) => {
          element.classList.add("red");
        });
        const infoDiv = document.getElementById("game-info");
        const h2 = createElement(
          "h2",
          "loser",
          "Hai perso! Per giocare di nuovo clicca su Play"
        );
        infoDiv.appendChild(h2);
        gameEnded = true;
      } else {
        myElement.classList.add("blue");
        counter();
        endGame();
      }
    });
    fragment.append(myElement);
  }
  mainElement.append(fragment);
}

//funzione campo minato
function campoMinato() {
  gameEnded = false;
  resetBoard();
  const board = document.getElementById("board");
  const level = parseInt(document.getElementById("difficolta").value);
  const cellNumber = setCellNumber(level);
  generateBombs(level);
  counter();
  createBoard(board, cellNumber);
}

// execution
let gameEnded = false;
const playButton = document.getElementById("play");
playButton.addEventListener("click", campoMinato);

