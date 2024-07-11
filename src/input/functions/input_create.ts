import { Input } from "../entities/Input";

export function input_create(): Input {
    const input: Input = {
        keys: {},
        mouse: null,
    };

    document.addEventListener("keydown", e => {
        input.keys[e.key] = true;
    });

    document.addEventListener("keyup", e => {
        input.keys[e.key] = false;
    });

    window.addEventListener("blur", () => {
        input.keys = {};
    });

    document.addEventListener("mousemove", e => {
        if (e.x < 1280 && e.y < 720) {
            input.mouse = { x: e.x, y: e.y };
        } else {
            input.mouse = null;
        }
    });

    return input;
}
