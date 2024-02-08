import { Cell } from "./cell.js";
import { Goblin } from "./goblin.js";
import { Cursor } from "./cursor.js"; // Импорт класса Cursor из файла cursor.js

export class Game {
  constructor() {
    this.gameContainer = document.getElementById("game-container");
    this.cursor = new Cursor(); // Создание экземпляра класса Cursor
    this.cursor.attachEvents(); // Добавление обработчика события мыши

    this.cells = [];
    this.goblins = [];
    this.score = 0;
    this.maxMissedGoblins = 5;
    this.missedGoblins = 0;
    this.intervalId = null;
    this.clickHandler = this.onClick.bind(this);
  }

  start() {
    this.createCells();
    this.intervalId = setInterval(() => this.spawnGoblin(), 1000);
    this.gameContainer.addEventListener("click", this.clickHandler);
  }

  createCells() {
    for (let i = 0; i < 16; i++) {
      const cell = new Cell();
      this.gameContainer.appendChild(cell.element);
      this.cells.push(cell);
    }
  }

  spawnGoblin() {
    if (
      this.goblins.length >= this.cells.length ||
      this.missedGoblins >= this.maxMissedGoblins
    ) {
      this.endGame();
      return;
    }

    const randomCellIndex = Math.floor(Math.random() * this.cells.length);
    const cell = this.cells[randomCellIndex];
    if (!cell.hasGoblin) {
      const goblin = new Goblin(cell);
      this.goblins.push(goblin);
      setTimeout(() => this.removeGoblin(goblin), 1000);
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
    }
  }

  removeGoblin(goblin) {
    goblin.destroy();
    this.goblins = this.goblins.filter((g) => g !== goblin);
  }

  endGame() {
    clearInterval(this.intervalId);
    this.gameContainer.removeEventListener("click", this.clickHandler);
    this.cursor.detachEvents(); // Удаление обработчика события мыши
    this.cursor.hideCursor(); // Скрытие кастомного курсора
    alert(`Game over! Your score: ${this.score}`);
  }
}
