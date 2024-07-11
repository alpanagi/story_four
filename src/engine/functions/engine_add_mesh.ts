import { Engine } from "../entities/Engine";
import { Mesh } from "../../mesh/entities/Mesh";

export function engine_add_mesh(engine: Engine, mesh: Mesh): void {
    engine.meshes.push(mesh);
}
