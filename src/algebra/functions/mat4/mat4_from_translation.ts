import { Mat4 } from "../../entities/Mat4";
import { Vec4 } from "../../entities/Vec4";

export function mat4_from_translation(translation: Vec4): Mat4 {
    return [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        translation,
    ];
}
