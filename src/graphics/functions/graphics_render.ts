import { Camera } from "../../camera/entities/Camera";
import { Graphics } from "../entities/Graphics";
import { gpu_camera_update } from "./gpu_camera_update";

export function graphics_render(graphics: Graphics, camera: Camera): void {
    gpu_camera_update(graphics.device, graphics.gpu_camera, camera);

    const command_encoder = graphics.device.createCommandEncoder();
    const render_pass_descriptor: GPURenderPassDescriptor = {
        colorAttachments: [
            {
                clearValue: { r: 0, g: 0, b: 0, a: 1 },
                loadOp: "clear",
                storeOp: "store",
                view: graphics.canvas_context
                    .getCurrentTexture()
                    .createView(),
            },
        ],
        depthStencilAttachment: {
            view: graphics.depth_texture.createView(),
            depthClearValue: 1.0,
            depthLoadOp: "clear",
            depthStoreOp: "store",
        },
    };

    const passEncoder = command_encoder.beginRenderPass(render_pass_descriptor);
    passEncoder.setPipeline(graphics.render_pipeline);

    passEncoder.setBindGroup(0, graphics.camera_bind_group);
    passEncoder.setBindGroup(1, graphics.texture_atlas_bind_group);
    passEncoder.setBindGroup(2, graphics.transform_bind_group);

    for (const gpu_mesh of graphics.gpu_meshes) {
        passEncoder.setVertexBuffer(0, gpu_mesh.vertexBuffer);
        passEncoder.draw(gpu_mesh.mesh.vertices.length);
    }

    passEncoder.end();
    graphics.device.queue.submit([command_encoder.finish()]);
}
