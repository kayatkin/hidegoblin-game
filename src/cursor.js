export class Cursor {
    constructor() {
        this.cursorElement = document.createElement('div');
        this.cursorElement.classList.add('custom-cursor');
        document.body.appendChild(this.cursorElement);
        this.updateCursorPosition = this.updateCursorPosition.bind(this);
        this.setHammerCursor();
    }

    setHammerCursor() {
        this.cursorElement.style.backgroundImage = 'url("./hammer.png")';
        this.cursorElement.style.width = '50px';
        this.cursorElement.style.height = '50px';
        this.cursorElement.style.backgroundSize = 'cover';
        this.cursorElement.style.position = 'absolute';
        this.cursorElement.style.pointerEvents = 'none';
        this.cursorElement.style.zIndex = '9999';
        this.cursorElement.style.display = 'none';
    }

    updateCursorPosition(event) {
        this.cursorElement.style.left = `${event.clientX}px`;
        this.cursorElement.style.top = `${event.clientY}px`;
    }

    showCursor() {
        this.cursorElement.style.display = 'block';
    }

    hideCursor() {
        this.cursorElement.style.display = 'none';
    }

    attachEvents() {
        document.addEventListener('mousemove', this.updateCursorPosition);
    }

    detachEvents() {
        document.removeEventListener('mousemove', this.updateCursorPosition);
    }
}
