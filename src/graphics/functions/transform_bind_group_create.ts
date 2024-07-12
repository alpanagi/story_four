import { mat4_data_size } from "../../algebra/functions/mat4/mat4_data_size";

export function transform_bind_group_create(
    device: GPUDevice,
    pipeline: GPURenderPipeline,
): GPUBindGroup {
    const uniform_buffer = device.createBuffer({
        label: "transform_buffer",
        size: mat4_data_size(),
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });

    return device.createBindGroup({
        layout: pipeline.getBindGroupLayout(2),
        entries: [
            { binding: 0, resource: { buffer: uniform_buffer } },
        ],
    });
}
