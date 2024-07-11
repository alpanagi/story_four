export function create_depth_texture(device: GPUDevice): GPUTexture {
    return device.createTexture({
        size: [1280, 720],
        format: "depth24plus",
        usage: GPUTextureUsage.RENDER_ATTACHMENT,
    });
}
