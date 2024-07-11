import { Vec4 } from "../../entities/Vec4";
import { vec4_magnitude } from "./vec4_magnitude";

export function vec4_normalize(val: Vec4): Vec4 {
    const magnitude = vec4_magnitude(val);
    return [val[0] / magnitude, val[1] / magnitude, val[2] / magnitude, 1];
}
