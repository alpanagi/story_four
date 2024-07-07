import { Camera, create_camera } from "./camera";
import { Graphics, graphics_add_mesh, graphics_render, init_graphics } from "./graphics/graphics";
import { Mesh } from "./data/mesh";
import { fps } from "./debug";

export interface Engine {
    graphics: Graphics;
    camera: Camera;
    meshes: Mesh[];
}

export async function create_engine(): Promise<Engine> {
    return {
        graphics: await init_graphics(),
        camera: create_camera(),
        meshes: [],
    };
}

export function engine_add_mesh(engine: Engine, mesh: Mesh): void {
    engine.meshes.push(mesh);
    graphics_add_mesh(engine.graphics, mesh);
}

async function _engine_run(engine: Engine, camera: Camera): Promise<void> {
    graphics_render(engine.graphics, camera);
    window.requestAnimationFrame(() => engine_run(engine, camera));
}

export const engine_run = fps(_engine_run);
