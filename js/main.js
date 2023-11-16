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
  let maxNumber;
  switch (level) {
    case 3:
      maxNumber = 100;
      break;
    case 2:
      maxNumber = 81;
      break;
    case 1:
      maxNumber = 49;
      break;
  }
  const bombs = [];
  while (bombs.length < 16) {
    const randomNum = Math.floor(Math.random() * maxNumber) + 1;
    if (!bombs.includes(randomNum)) {
      bombs.push(randomNum);
    }
  }
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
      cellNumber = 81; //9*9 = 9^2
      break;

    case 3:
      cellNumber = 49; //7*7 = 7^2
      break;

    case 1:
    default:
      cellNumber = 100; //9*9 = 9^2
      break;
  }

  return cellNumber;
}

//funzione counter
function counter() {
  const clickedCells = document.querySelectorAll(".blue").length;
  document.getElementById("counter").textContent = `Il tuo punteggio è: ${clickedCells}`;
}

//funzione crea board
function createBoard(mainElement, cellNumber) {
  const cells = Math.sqrt(cellNumber);
  const level = parseInt(document.getElementById("difficolta").value);
  const bombs = generateBombs(level);
  const fragment = document.createDocumentFragment();


  for (let i = 1; i <= cellNumber; i++) {
    const myElement = createElement("div", "cell", i);
    myElement.classList.add(`cell-${cells}`);

    myElement.addEventListener("click", function () {
      console.log(`Cell ${i} clicked!`);
      checkBomb(i, bombs);
      if (bombs.includes(i)) {
        myElement.classList.add("red");
      } else {
        myElement.classList.add("blue");
        counter();
      }
    });

    fragment.append(myElement);
  }
  mainElement.append(fragment);
}

//funzione campo minato
function campoMinato() {
  resetBoard();
  const board = document.getElementById("board");
  const level = parseInt(document.getElementById("difficolta").value);
  console.log(level);
  const cellNumber = setCellNumber(level);

  const bombs = generateBombs(level);
  console.log(bombs);
  counter();
  createBoard(board, cellNumber);
}

// execution

const playButton = document.getElementById("play");
playButton.addEventListener("click", campoMinato);

// playButton.addEventListener("click", function () {
//   resetBoard();
//   //predo il valore del select
//   const inputValue = document.getElementById("difficolta").value;
//   if (inputValue === "3") {
//     for (let i = 1; i <= 49; i++) {
//       const myElement = createElement("div", "cell-7", i);
//       myElement.addEventListener("click", function () {
//         console.log(`Cell ${i} clicked!`);
//         myElement.classList.toggle("blue");
//       });
//       document.getElementById("board").append(myElement);
//     }
//   } else if (inputValue === "2") {
//     for (let i = 1; i <= 81; i++) {
//       const myElement = createElement("div", "cell-9", i);
//       myElement.addEventListener("click", function () {
//         console.log(`Cell ${i} clicked!`);
//         myElement.classList.toggle("blue");
//       });
//       document.getElementById("board").append(myElement);
//     }
//   } else if (inputValue === "1") {
//     for (let i = 1; i <= 100; i++) {
//       const myElement = createElement("div", "cell-10", i);
//       myElement.addEventListener("click", function () {
//         console.log(`Cell ${i} clicked!`);
//         myElement.classList.toggle("blue");
//       });
//       document.getElementById("board").append(myElement);
//     }
//   }
// });
