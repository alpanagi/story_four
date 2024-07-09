import { Vec2, vec2_add } from "../math/vec2";
import { Vec4, vec4_add, vec4_zero } from "../math/vec4";
import { Vertex } from "./vertex";

export class Mesh {
    vertices: Vertex[];
    position: Vec4;
    data: Float32Array;

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

export function mesh_offset_uvs(mesh: Mesh, offset: Vec2): Mesh {
    mesh.vertices = mesh.vertices.map(x => ({ ...x, uv: vec2_add(x.uv, offset) }));
    mesh.data = mesh_vertex_data(mesh);
    return mesh;
}
