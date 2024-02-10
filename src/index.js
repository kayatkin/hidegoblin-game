import "./styles.css";
import characterImage from "./goblin.png";
import { Cell } from "./cell.js";
import { Goblin } from "./goblin.js";
import { Cursor } from "./cursor.js";

class Game {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.cells = [];
    this.goblins = [];
    this.score = 0;
    this.maxMissedGoblins = 5;
    this.missedGoblins = 0;
    this.intervalId = null;
    this.init();
  }

  init() {
    this.createCells();
    this.createCharacter();
    this.start();
    this.setCursor();
    this.displayScore();
  }

  createCells() {
    for (let i = 0; i < 16; i++) {
      const cell = new Cell();
      this.container.appendChild(cell.element);
      this.cells.push(cell);
    }
  }

  createCharacter() {
    this.character = document.createElement("img");
    this.character.src = characterImage;
    this.character.style.display = "none";
    this.container.appendChild(this.character);
  }

  getRandomCell() {
    const randomIndex = Math.floor(Math.random() * this.cells.length);
    return this.cells[randomIndex].element;
  }

  moveCharacter() {
    const cell = this.getRandomCell();
    this.character.style.gridRow = cell.style.gridRow;
    this.character.style.gridColumn = cell.style.gridColumn;
    this.character.style.display = "block";
  }

  spawnGoblin() {
    const randomCellIndex = Math.floor(Math.random() * this.cells.length);
    const cell = this.cells[randomCellIndex];

    if (!cell.hasGoblin) {
      const goblin = new Goblin(cell, this.goblins);
      this.goblins.push(goblin);

      cell.hasGoblin = true;

      setTimeout(() => {
        if (!goblin.isCaught) {
          this.missedGoblins++;
          this.displayMissedGoblins();
          if (this.missedGoblins >= this.maxMissedGoblins) {
            this.endGame();
          }
        }
        this.removeGoblin(goblin);
      }, 1000);
    }
  }

  onClick(event) {
    const clickedCell = event.target.closest(".cell");
    if (!clickedCell) return;

    const goblin = this.goblins.find(
      (goblin) => goblin.cell.element === clickedCell
    );
    if (goblin) {
      this.score++;
      this.removeGoblin(goblin);
      this.displayScore();
    }
  }

  displayScore() {
    const scoreElement = document.getElementById("score");
    if (scoreElement) {
      scoreElement.innerText = `Score: ${this.score}`;
    }
  }

  displayMissedGoblins() {
    const missedElement = document.getElementById("missed");
    if (missedElement) {
      missedElement.innerText = `Missed Goblins: ${this.missedGoblins}/${this.maxMissedGoblins}`;
    }
  }

  removeGoblin(goblin) {
    goblin.destroy();
    this.goblins = this.goblins.filter((g) => g !== goblin);
  }

  start() {
    this.intervalId = setInterval(() => this.spawnGoblin(), 1000);
    this.container.addEventListener("click", this.onClick.bind(this));
  }

  endGame() {
    clearInterval(this.intervalId);
    this.container.removeEventListener("click", this.onClick);
    alert(`Game over! Your score: ${this.score}`);
  }

  setCursor() {
    const cursor = new Cursor();
    cursor.attachEvents();
    cursor.showCursor();
  }
}

const game = new Game("game-container");
