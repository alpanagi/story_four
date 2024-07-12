import { engine_add_mesh } from "../../engine/functions/engine_add_mesh";
import { engine_create } from "../../engine/functions/engine_create";
import { engine_run } from "../../engine/functions/engine_run";
import { level_create } from "../../level/functions/functions/level_create";
import { texture_repository } from "../../state";

export async function main(): Promise<void> {
    const texture_atlas = await texture_repository.get("atlas.png");
    const engine = await engine_create(texture_atlas);

    const level = await level_create();
    level.meshes.forEach(x => engine_add_mesh(engine, x));
    await engine_run(engine, engine.camera);
}
