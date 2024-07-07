export const VEC4_DATA_SIZE = 4 * 4;

export type Vec4 = [number, number, number, number];

export function vec4_add(a: Vec4, b: Vec4): Vec4 {
    return a.map((x, idx) => x + (b[idx] ?? 0)) as Vec4;
}
