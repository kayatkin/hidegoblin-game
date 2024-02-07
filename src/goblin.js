import characterImage from './goblin.png';

export class Goblin {
  constructor(cell) {
    this.element = document.createElement('img');
    this.element.src = characterImage;
    this.element.classList.add('goblin');
    cell.element.appendChild(this.element);
    cell.hasGoblin = true;
    this.cell = cell;
  }

  destroy() {
    this.cell.element.removeChild(this.element);
    this.cell.hasGoblin = false;
  }
}
