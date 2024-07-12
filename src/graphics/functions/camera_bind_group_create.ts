import { GpuCamera } from "../entities/GpuCamera";

export function camera_bind_group_create(
    device: GPUDevice,
    pipeline: GPURenderPipeline,
    gpuCamera: GpuCamera,
): GPUBindGroup {
    return device.createBindGroup({
        layout: pipeline.getBindGroupLayout(0),
        entries: [
            { binding: 0, resource: { buffer: gpuCamera.uniform_buffer } },
        ],
    });
}
