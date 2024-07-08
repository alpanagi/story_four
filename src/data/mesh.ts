import { Vec4, vec4_add, vec4_zero } from "../math/vec4";
import { Vertex } from "./vertex";

export class Mesh {
    readonly vertices: Vertex[];
    readonly position: Vec4;
    readonly data: Float32Array;

    constructor(vertices: Vertex[], position: Vec4 = vec4_zero()) {
        this.vertices = vertices;
        this.position = position;
        this.data = mesh_vertex_data(this);
    }
}

function mesh_vertex_data(mesh: Mesh): Float32Array {
    return new Float32Array([
        ...mesh.vertices.map(x => [...vec4_add(x.position, mesh.position), ...x.uv]),
    ].flat());
}

export function mesh_combine(meshes: Mesh[]): Mesh {
    return new Mesh(
        meshes.map(x => x.vertices.map(y => ({
            position: vec4_add(x.position, y.position),
            uv: y.uv,
        }))).flat(),
        vec4_zero(),
    );
}
