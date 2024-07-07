import { VERTEX_DATA_SIZE, Vertex } from "./vertex";
import { Vec4, vec4_add } from "../math/vec4";

export interface Mesh {
    vertices: Vertex[];
    position: Vec4;
}

export function create_mesh(vertices: Vertex[]): Mesh {
    return { vertices, position: [0, 0, 0, 0] };
}

export function mesh_vertex_data_size(mesh: Mesh): number {
    return mesh.vertices.length * VERTEX_DATA_SIZE;
}

export function mesh_vertex_data(mesh: Mesh): Float32Array {
    return new Float32Array([
        ...mesh.vertices.map(x => vec4_add(x.position, mesh.position)),
    ].flat());
}
