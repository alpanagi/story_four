import { Mesh } from "../entities/Mesh";
import { Vec4 } from "../../algebra/entities/Vec4";
import { Vertex } from "../entities/Vertex";
import { mesh_vertex_data } from "./mesh_vertex_data";
import { vec4_zero } from "../../algebra/functions/vec4/vec4_zero";

export function create_mesh(vertices: Vertex[], position: Vec4 = vec4_zero()): Mesh {
    return {
        vertices,
        position,
        data: mesh_vertex_data(vertices, position),
    };
}
