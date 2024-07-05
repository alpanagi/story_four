import { VERTEX_SIZE, Vertex } from "./vertex";

export interface Mesh {
    vertices: Vertex[];

    vertex_data: () => Float32Array;
    vertex_data_size: () => number;
}

export function create_mesh(vertices: Vertex[]): Mesh {
    return {
        vertices,

        vertex_data,
        vertex_data_size,
    };
}

export function vertex_data_size(this: Mesh): number {
    return this.vertices.length * VERTEX_SIZE;
}

export function vertex_data(this: Mesh): Float32Array {
    return new Float32Array([...this.vertices.map(x => x.position)].flat());
}
