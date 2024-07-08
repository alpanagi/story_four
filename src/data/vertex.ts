import { VEC4_DATA_SIZE, Vec4 } from "../math/vec4";
import { Vec2 } from "../math/vec2";

export const VERTEX_DATA_SIZE = VEC4_DATA_SIZE;

export interface Vertex {
    position: Vec4;
    uv: Vec2;
}
