import { Mesh } from "../entities/Mesh";
import { mesh_create } from "./mesh_create";
import { vec4_add } from "../../algebra/functions/vec4/vec4_add";
import { vec4_zero } from "../../algebra/functions/vec4/vec4_zero";

export function mesh_combine(meshes: Mesh[]): Mesh {
    return mesh_create({
        vertices: meshes.map(x => x.vertices.map(y => ({
            position: vec4_add(x.position, y.position),
            uv: y.uv,
        }))).flat(),
        position: vec4_zero(),
    });
}
