export class Cursor {
  constructor() {
    this.cursorElement = document.createElement("div");
    this.cursorElement.classList.add("hammer-cursor");
    document.body.appendChild(this.cursorElement);
    this.updateCursorPosition = this.updateCursorPosition.bind(this);
    this.setHammerCursor();
    this.hideArrowCursor();
  }

  setHammerCursor() {
    this.cursorElement.style.backgroundImage = 'url("./hammer.png")';
    this.cursorElement.style.width = "50px";
    this.cursorElement.style.height = "50px";
    this.cursorElement.style.backgroundSize = "cover";
    this.cursorElement.style.position = "absolute";
    this.cursorElement.style.pointerEvents = "none";
    this.cursorElement.style.zIndex = "9999";
    this.cursorElement.style.display = "none";
  }

  updateCursorPosition(event) {
    this.cursorElement.style.left = `${event.clientX}px`;
    this.cursorElement.style.top = `${event.clientY}px`;
  }

  showCursor() {
    this.cursorElement.style.display = "block";
  }

  hideCursor() {
    this.cursorElement.style.display = "none";
  }

  hideArrowCursor() {
    document.body.style.cursor = "none";
  }

  showArrowCursor() {
    document.body.style.cursor = "default";
  }

  attachEvents() {
    document.addEventListener("mousemove", this.updateCursorPosition);
  }

  detachEvents() {
    document.removeEventListener("mousemove", this.updateCursorPosition);
  }
}
