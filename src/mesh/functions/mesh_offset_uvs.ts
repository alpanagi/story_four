import { Mesh } from "../entities/Mesh";
import { Vec2 } from "../../algebra/entities/Vec2";
import { create_mesh } from "./create_mesh";
import { vec2_add } from "../../algebra/functions/vec2/vec2_add";

export function mesh_offset_uvs(mesh: Mesh, offset: Vec2): Mesh {
    const vertices = mesh.vertices.map(x => ({ ...x, uv: vec2_add(x.uv, offset) }));

    return create_mesh(
        vertices,
        mesh.position,
    );
}
