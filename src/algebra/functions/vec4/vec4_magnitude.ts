import { Vec4 } from "../../entities/Vec4";

export function vec4_magnitude(val: Vec4): number {
    return Math.sqrt((val[0] * val[0]) + (val[1] * val[1]) + (val[2] * val[2]));
}
