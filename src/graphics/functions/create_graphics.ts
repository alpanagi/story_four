import { Graphics } from "../entities/Graphics";
import { canvas_context_get } from "./canvas_context_get";
import { create_camera } from "../../camera/functions/create_camera";
import { create_camera_bind_group } from "./create_camera_bind_group";
import { create_depth_texture } from "./create_depth_texture";
import { create_gpu_camera } from "./create_gpu_camera";
import { create_render_pipeline } from "./create_render_pipeline";
import { create_texture_atlas_bind_group } from "./create_texture_atlas_bind_group";
import { device_get } from "./device_get";

export async function create_graphics(texture_atlas: ImageBitmap): Promise<Graphics> {
    const device = await device_get();
    const canvas_context = canvas_context_get(device);
    const render_pipeline = create_render_pipeline(device);
    const gpu_camera = create_gpu_camera(device, create_camera());
    const camera_bind_group = create_camera_bind_group(
        device,
        render_pipeline,
        gpu_camera,
    );
    const texture_atlas_bind_group = create_texture_atlas_bind_group(
        device,
        render_pipeline,
        texture_atlas,
    );
    const depth_texture = create_depth_texture(device);

    return {
        device,
        canvas_context,
        render_pipeline,
        gpu_meshes: [],
        gpu_camera,
        camera_bind_group,
        texture_atlas_bind_group,
        depth_texture,
    };
}
