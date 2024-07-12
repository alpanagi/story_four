import { Graphics } from "../entities/Graphics";
import { camera_bind_group_create } from "./camera_bind_group_create";
import { camera_create } from "../../camera/functions/camera_create";
import { canvas_context_get } from "./canvas_context_get";
import { depth_texture_create } from "./depth_texture_create";
import { device_get } from "./device_get";
import { gpu_camera_create } from "./gpu_camera_create";
import { render_pipeline_create } from "./render_pipeline_create";
import { texture_atlas_bind_group_create } from "./texture_atlas_bind_group_create";
import { transform_bind_group_create } from "./transform_bind_group_create";

export async function graphics_create(texture_atlas: ImageBitmap): Promise<Graphics> {
    const device = await device_get();
    const canvas_context = canvas_context_get(device);
    const render_pipeline = render_pipeline_create(device);
    const gpu_camera = gpu_camera_create(device, camera_create());
    const camera_bind_group = camera_bind_group_create(
        device,
        render_pipeline,
        gpu_camera,
    );
    const texture_atlas_bind_group = texture_atlas_bind_group_create(
        device,
        render_pipeline,
        texture_atlas,
    );
    const transform_bind_group = transform_bind_group_create(
        device,
        render_pipeline,
    );
    const depth_texture = depth_texture_create(device);

    return {
        device,
        canvas_context,
        render_pipeline,
        gpu_meshes: [],
        gpu_camera,
        camera_bind_group,
        texture_atlas_bind_group,
        transform_bind_group,
        depth_texture,
    };
}
