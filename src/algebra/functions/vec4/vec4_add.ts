import { Vec4 } from "../../entities/Vec4";

export function vec4_add(a: Vec4, b: Vec4): Vec4 {
    return a.map((x, idx) => x + (b[idx] ?? 0)) as Vec4;
}