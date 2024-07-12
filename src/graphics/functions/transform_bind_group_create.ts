export function transform_bind_group_create(
    device: GPUDevice,
    pipeline: GPURenderPipeline,
    transform_buffer: GPUBuffer,
): GPUBindGroup {
    return device.createBindGroup({
        layout: pipeline.getBindGroupLayout(2),
        entries: [
            { binding: 0, resource: { buffer: transform_buffer } },
        ],
    });
}
