import { Vec2 } from "../../entities/Vec2";

export function vec2_add(a: Vec2, b: Vec2): Vec2 {
    return [a[0] + b[0], a[1] + b[1]];
}
