import { Mesh } from "../entities/Mesh";
import { create_mesh } from "./create_mesh";
import { vec4_add } from "../../algebra/functions/vec4/vec4_add";
import { vec4_zero } from "../../algebra/functions/vec4/vec4_zero";

export function mesh_combine(meshes: Mesh[]): Mesh {
    return create_mesh(
        meshes.map(x => x.vertices.map(y => ({
            position: vec4_add(x.position, y.position),
            uv: y.uv,
        }))).flat(),
        vec4_zero(),
    );
}
