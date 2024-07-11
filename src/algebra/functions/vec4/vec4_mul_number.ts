import { Vec4 } from "../../entities/Vec4";

export function vec4_mul_number(a: Vec4, b: number): Vec4 {
    return [a[0] * b, a[1] * b, a[2] * b, 1];
}
