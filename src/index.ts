import { create_engine, engine_add_mesh, engine_run } from "./engine";
import { load_obj } from "./obj";

void main();

async function main(): Promise<void> {
    const engine = await create_engine();

    const mesh = await load_obj("tile.obj");

    for (const j of [...Array(100).keys()]) {
        for (const i of [...Array(100).keys()]) {
            engine_add_mesh(engine, { ...mesh, position: [1.7 * i, 0, 1.7 * j, 0] });
        }
    }

    await engine_run(engine, engine.camera);
}
