import { Engine } from "../entities/Engine";
import { create_camera } from "../../camera/functions/create_camera";
import { create_graphics } from "../../graphics/functions/create_graphics";
import { create_input } from "../../input/functions/create_input";

export async function create_engine(texture_atlas: ImageBitmap): Promise<Engine> {
    return {
        graphics: await create_graphics(texture_atlas),
        input: create_input(),
        camera: create_camera(),
        meshes: [],
    };
}
