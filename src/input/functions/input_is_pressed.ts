import { Input } from "../entities/Input";

export function input_is_pressed(input: Input, key: string): boolean {
    return input.keys[key] === true;
}
