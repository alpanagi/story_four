import { Mat4 } from "../../entities/Mat4";

export function mat4_data(matrix: Mat4): Float32Array {
    return new Float32Array(matrix.flat());
}
