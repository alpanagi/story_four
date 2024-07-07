export class Input {
    keys: Record<string, boolean> = {};

    constructor() {
        document.addEventListener("keydown", e => {
            this.keys[e.key] = true;
        });

        document.addEventListener("keyup", e => {
            this.keys[e.key] = false;
        });

        window.onblur = (): void => {
            this.keys = {};
        };
    }

    is_pressed(key: string): boolean {
        return this.keys[key] === true;
    }
}
