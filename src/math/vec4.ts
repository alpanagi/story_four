export const VEC4_DATA_SIZE = 4 * 4;

export type Vec4 = [number, number, number, number];

export function vec4_add(a: Vec4, b: Vec4): Vec4 {
    return a.map((x, idx) => x + (b[idx] ?? 0)) as Vec4;
}

export function vec4_zero(): Vec4 {
    return [0, 0, 0, 1];
}

export function vec4_magnitude(val: Vec4): number {
    return Math.sqrt((val[0] * val[0]) + (val[1] * val[1]) + (val[2] * val[2]));
}

export function vec4_normalize(val: Vec4): Vec4 {
    const magnitude = vec4_magnitude(val);
    return [val[0] / magnitude, val[1] / magnitude, val[2] / magnitude, 1];
}

export function vec4_mul_number(a: Vec4, b: number): Vec4 {
    return [a[0] * b, a[1] * b, a[2] * b, 1];
}
