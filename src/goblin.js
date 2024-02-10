import characterImage from "./goblin.png";

export class Goblin {
  constructor(cell, goblinsArray) {
    this.element = document.createElement("img");
    this.element.src = characterImage;
    this.element.classList.add("goblin");
    cell.element.appendChild(this.element);
    cell.hasGoblin = true;
    this.cell = cell;
    this.goblinsArray = goblinsArray;
    this.destroy = this.destroy.bind(this);
  }

  destroy() {
    if (!this.cell.element.contains(this.element)) {
      this.cell.element.appendChild(this.element);
    }

    this.cell.element.removeChild(this.element);
    this.cell.hasGoblin = false;

    this.goblinsArray = this.goblinsArray.filter(goblin => goblin !== this);
  }
}
