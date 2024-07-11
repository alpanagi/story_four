import { Engine } from "../entities/Engine";
import { camera_create } from "../../camera/functions/camera_create";
import { graphics_create } from "../../graphics/functions/graphics_create";
import { input_create } from "../../input/functions/input_create";

export async function engine_create(texture_atlas: ImageBitmap): Promise<Engine> {
    return {
        graphics: await graphics_create(texture_atlas),
        input: input_create(),
        camera: camera_create(),
        meshes: [],
    };
}
