import { Vec4 } from "../../algebra/entities/Vec4";
import { Vertex } from "../entities/Vertex";
import { vec4_add } from "../../algebra/functions/vec4/vec4_add";

export function mesh_vertex_data(vertices: Vertex[], position: Vec4): Float32Array {
    return new Float32Array([
        ...vertices.map(x => [...vec4_add(x.position, position), ...x.uv]),
    ].flat());
}
