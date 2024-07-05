import { create_engine } from "./engine";
import { load_obj } from "./obj";

void main();

async function main(): Promise<void> {
    const engine = await create_engine();
    engine.add_mesh(await load_obj("triangle.obj"));
    void engine.run();
}
