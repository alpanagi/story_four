import { create_engine, engine_add_mesh, engine_run } from "./engine";
import { load_obj } from "./obj";

void main();

async function main(): Promise<void> {
    const engine = await create_engine();
    engine_add_mesh(engine, await load_obj("triangle.obj"));
    engine_run(engine);
}
