export class Input {
    constructor() {
        this.keys = {};
    }

    isKeyPressed(key) {
        return this.keys[key] ?? false;
    }

    onKeyDown(event) {
        this.keys[event.keyCode] = true;
    }

    onKeyUp(event) {
        this.keys[event.keyCode] = false;
    }
}
