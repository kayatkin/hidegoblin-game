import { Cell } from './cell.js';
import { Goblin } from './goblin.js';

export class Game {
  constructor() {
    this.gameContainer = document.getElementById('game-container');
    this.gameContainer.addEventListener('mouseover', () => this.gameContainer.classList.add('hammer-cursor'));
    this.gameContainer.addEventListener('mouseout', () => this.gameContainer.classList.remove('hammer-cursor'));
    this.cells = [];
    this.goblins = [];
    this.score = 0;
    this.maxMissedGoblins = 5;
    this.missedGoblins = 0;
    this.intervalId = null;
  }

  start() {
    this.createCells();
    this.intervalId = setInterval(() => this.spawnGoblin(), 1000);
    this.gameContainer.addEventListener('click', event => this.onClick(event));
  }

  createCells() {
    for (let i = 0; i < 16; i++) {
      const cell = new Cell();
      this.gameContainer.appendChild(cell.element);
      this.cells.push(cell);
    }
  }

  spawnGoblin() {
    if (this.goblins.length >= this.cells.length || this.missedGoblins >= this.maxMissedGoblins) {
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
    const clickedCell = event.target.closest('.cell');
    if (!clickedCell) return;

    const goblin = this.goblins.find(goblin => goblin.cell.element === clickedCell);
    if (goblin) {
      this.score++;
      this.removeGoblin(goblin);
    }
  }

  removeGoblin(goblin) {
    goblin.destroy();
    this.goblins = this.goblins.filter(g => g !== goblin);
  }

  endGame() {
    clearInterval(this.intervalId);
    this.gameContainer.removeEventListener('click', this.onClick);
    alert(`Game over! Your score: ${this.score}`);
  }
}
