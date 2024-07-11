import { GpuCamera } from "../entities/GpuCamera";

export function create_camera_bind_group(
    device: GPUDevice,
    pipeline: GPURenderPipeline,
    gpuCamera: GpuCamera,
): GPUBindGroup {
    return device.createBindGroup({
        layout: pipeline.getBindGroupLayout(0),
        entries: [
            { binding: 0, resource: { buffer: gpuCamera.uniformBuffer } },
        ],
    });
}
