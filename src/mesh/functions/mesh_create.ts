import { Mesh } from "../entities/Mesh";
import { Vec4 } from "../../algebra/entities/Vec4";
import { Vertex } from "../entities/Vertex";
import { mesh_vertex_data } from "./mesh_vertex_data";
import { vec4_zero } from "../../algebra/functions/vec4/vec4_zero";

interface MeshCreateProps {
    vertices: Vertex[];
    position?: Vec4;
    is_transparent?: boolean;
}

export function mesh_create({
    vertices,
    position = vec4_zero(),
    is_transparent = false,
}: MeshCreateProps): Mesh {
    return {
        vertices,
        position,
        data: mesh_vertex_data(vertices, position),
        is_transparent,
    };
}
