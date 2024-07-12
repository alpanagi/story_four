import { GpuCamera } from "./GpuCamera";
import { GpuMesh } from "./GpuMesh";

export interface Graphics {
    canvas_context: GPUCanvasContext;
    device: GPUDevice;
    render_pipeline: GPURenderPipeline;
    gpu_meshes: GpuMesh[];
    gpu_camera: GpuCamera;
    camera_bind_group: GPUBindGroup;
    texture_atlas_bind_group: GPUBindGroup;
    transform_bind_group: GPUBindGroup;
    depth_texture: GPUTexture;
}
