import { VERTEX_SIZE, Vertex } from "./vertex";

export interface Mesh {
    vertices: Vertex[];
}

export function create_mesh(vertices: Vertex[]): Mesh {
    return { vertices };
}

export function mesh_vertex_data_size(mesh: Mesh): number {
    return mesh.vertices.length * VERTEX_SIZE;
}

export function mesh_vertex_data(mesh: Mesh): Float32Array {
    return new Float32Array([...mesh.vertices.map(x => x.position)].flat());
}
