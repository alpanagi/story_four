import { Camera } from "../../camera/entities/Camera";
import { Engine } from "../entities/Engine";
import { fps } from "../../debug/functions/fps";
import { graphics_add_mesh } from "../../graphics/functions/graphics_add_mesh";
import { graphics_render } from "../../graphics/functions/graphics_render";
import { input_is_pressed } from "../../input/functions/input_is_pressed";
import { mesh_combine } from "../../mesh/functions/mesh_combine";
import { vec4_add } from "../../algebra/functions/vec4/vec4_add";
import { vec4_magnitude } from "../../algebra/functions/vec4/vec4_magnitude";
import { vec4_mul_number } from "../../algebra/functions/vec4/vec4_mul_number";
import { vec4_normalize } from "../../algebra/functions/vec4/vec4_normalize";
import { vec4_zero } from "../../algebra/functions/vec4/vec4_zero";

const MOVEMENT_SPEED = 4;
let previous_frame_time = Date.now();

const frame = fps(_frame);

export async function engine_run(engine: Engine, camera: Camera): Promise<void> {
    graphics_add_mesh(engine.graphics, mesh_combine(engine.meshes));
    await frame(engine, camera);
}

async function _frame(engine: Engine, camera: Camera): Promise<void> {
    if (engine.input.mouse !== null) {
        // console.log(camera_viewport_to_world(camera, engine.input.mouse.x, engine.input.mouse.y));
    }
    const delta = (Date.now() - previous_frame_time) / 1000;
    previous_frame_time = Date.now();

    let movement = vec4_zero();
    if (input_is_pressed(engine.input, "w")) {
        movement = vec4_add(movement, [0.5, 0, -0.5, 0]);
    }
    if (input_is_pressed(engine.input, "s")) {
        movement = vec4_add(movement, [-0.5, 0, 0.5, 0]);
    }
    if (input_is_pressed(engine.input, "a")) {
        movement = vec4_add(movement, [-0.5, 0, -0.5, 0]);
    }
    if (input_is_pressed(engine.input, "d")) {
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
