import { Camera, create_camera } from "./camera";
import { Graphics, graphics_add_mesh, graphics_render, init_graphics } from "./graphics/graphics";
import { Mesh, mesh_combine } from "./data/mesh";
import { vec4_add, vec4_magnitude, vec4_mul_number, vec4_normalize, vec4_zero } from "./math/vec4";
import { Input } from "./input";
import { fps } from "./debug";

export interface Engine {
    graphics: Graphics;
    input: Input;
    camera: Camera;
    meshes: Mesh[];
}

export async function create_engine(texture_atlas: ImageBitmap): Promise<Engine> {
    return {
        graphics: await init_graphics(texture_atlas),
        input: new Input(),
        camera: create_camera(),
        meshes: [],
    };
}

export function engine_add_mesh(engine: Engine, mesh: Mesh): void {
    engine.meshes.push(mesh);
}

const MOVEMENT_SPEED = 4;
let previous_frame_time = Date.now();

async function _frame(engine: Engine, camera: Camera): Promise<void> {
    const delta = (Date.now() - previous_frame_time) / 1000;
    previous_frame_time = Date.now();

    let movement = vec4_zero();
    if (engine.input.is_pressed("w")) {
        movement = vec4_add(movement, [0.5, 0, -0.5, 0]);
    }
    if (engine.input.is_pressed("s")) {
        movement = vec4_add(movement, [-0.5, 0, 0.5, 0]);
    }
    if (engine.input.is_pressed("a")) {
        movement = vec4_add(movement, [-0.5, 0, -0.5, 0]);
    }
    if (engine.input.is_pressed("d")) {
        movement = vec4_add(movement, [0.5, 0, 0.5, 0]);
    }
    if (vec4_magnitude(movement) > 0.001) {
        camera.position = vec4_add(
            camera.position,
            vec4_mul_number(vec4_normalize(movement), MOVEMENT_SPEED * delta),
        );
    }

    graphics_render(engine.graphics, camera);
    window.requestAnimationFrame(() => frame(engine, camera));
}

const frame = fps(_frame);

export async function engine_run(engine: Engine, camera: Camera): Promise<void> {
    graphics_add_mesh(engine.graphics, mesh_combine(engine.meshes));
    await frame(engine, camera);
}
