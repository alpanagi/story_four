import { Graphics, graphics_add_mesh, graphics_render, init_graphics } from "./graphics/graphics";
import { Mesh } from "./data/mesh";

interface Engine {
    graphics: Graphics;
    meshes: Mesh[];
}

export async function create_engine(): Promise<Engine> {
    return {
        graphics: await init_graphics(),
        meshes: [],
    };
}

export function engine_add_mesh(engine: Engine, mesh: Mesh): void {
    engine.meshes.push(mesh);
    graphics_add_mesh(engine.graphics, mesh);
}

export function engine_run(engine: Engine): void {
    graphics_render(engine.graphics);
    window.requestAnimationFrame(() => engine_run(engine));
}
