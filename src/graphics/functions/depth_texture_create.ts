export function depth_texture_create(device: GPUDevice): GPUTexture {
    return device.createTexture({
        size: [1280, 720],
        format: "depth24plus",
        usage: GPUTextureUsage.RENDER_ATTACHMENT,
    });
}
