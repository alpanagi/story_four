import { Graphics, init_graphics } from "./graphics/graphics";
import { Mesh } from "./data/mesh";

interface Engine {
    graphics: Graphics;
    meshes: Mesh[];

    add_mesh: (mesh: Mesh) => void;
    run: () => void;
}

export async function create_engine(): Promise<Engine> {
    const graphics = await init_graphics();

    return {
        graphics,
        meshes: [],
        add_mesh,
        run,
    };
}

export function add_mesh(this: Engine, mesh: Mesh): void {
    this.meshes.push(mesh);
    this.graphics.add_mesh(mesh);
}

export function run(this: Engine): void {
    this.graphics.render();
    window.requestAnimationFrame(() => run.bind(this));
}
