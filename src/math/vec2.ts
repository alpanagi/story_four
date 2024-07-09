export const VEC4_DATA_SIZE = 2 * 4;

export type Vec2 = [number, number];

export function vec2_add(a: Vec2, b: Vec2): Vec2 {
    return [a[0] + b[0], a[1] + b[1]];
}
