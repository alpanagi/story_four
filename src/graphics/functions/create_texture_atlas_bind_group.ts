export function create_texture_atlas_bind_group(
    device: GPUDevice,
    pipeline: GPURenderPipeline,
    texture_atlas: ImageBitmap,
): GPUBindGroup {
    const texture = device.createTexture({
        size: [texture_atlas.width, texture_atlas.height],
        format: "rgba8unorm",
        usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT,
    });
    device.queue.copyExternalImageToTexture(
        { source: texture_atlas, flipY: false },
        { texture },
        { width: texture_atlas.width, height: texture_atlas.height },
    );

    const sampler = device.createSampler({
        addressModeU: "clamp-to-edge",
        addressModeV: "clamp-to-edge",
        magFilter: "nearest",
    });

    return device.createBindGroup({
        layout: pipeline.getBindGroupLayout(1),
        entries: [
            { binding: 0, resource: sampler },
            { binding: 1, resource: texture.createView() },
        ],
    });
}
