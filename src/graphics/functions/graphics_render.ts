import { Camera } from "../../camera/entities/Camera";
import { GpuMesh } from "../entities/GpuMesh";
import { Graphics } from "../entities/Graphics";
import { gpu_camera_update } from "./gpu_camera_update";
import { mat4_from_translation } from "../../algebra/functions/mat4/mat4_from_translation";

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

    render_pass(graphics, command_encoder, render_pass_descriptor, false);
    render_pass(graphics, command_encoder, render_pass_descriptor, true);

    graphics.device.queue.submit([command_encoder.finish()]);
}

function render_pass(graphics: Graphics, command_encoder: GPUCommandEncoder, render_pass_descriptor: GPURenderPassDescriptor, should_render_transparent: boolean): void {
    const encoder = command_encoder.beginRenderPass(render_pass_descriptor);
    encoder.setPipeline(graphics.render_pipeline);

    encoder.setBindGroup(0, graphics.camera_bind_group);
    encoder.setBindGroup(1, graphics.texture_atlas_bind_group);

    const mesh_transform_data: number[] = [];
    graphics.gpu_meshes
        .forEach(x => {
            const transform_data = mat4_from_translation(x.mesh.position).flat();
            mesh_transform_data.push(...transform_data);

            const remaining = 256 - transform_data.length;
            const padding_data = new Array(remaining).fill(0);
            mesh_transform_data.push(...padding_data);
        });
    graphics.device.queue.writeBuffer(graphics.transform_buffer, 0, new Float32Array(mesh_transform_data));

    graphics.gpu_meshes.forEach((x, idx) => {
        if (x.mesh.is_transparent !== should_render_transparent) {
            render_mesh(graphics, encoder, x, idx * 256 * 4);
        }
    });

    graphics.gpu_meshes.forEach((x, idx) => {
        if (x.mesh.is_transparent === should_render_transparent) {
            render_mesh(graphics, encoder, x, idx * 256 * 4);
        }
    });

    encoder.end();
}

function render_mesh(graphics: Graphics, encoder: GPURenderPassEncoder, gpu_mesh: GpuMesh, offset: number): void {
    encoder.setBindGroup(2, graphics.transform_bind_group, [offset]);
    encoder.setVertexBuffer(0, gpu_mesh.vertexBuffer);
    encoder.draw(gpu_mesh.mesh.vertices.length);
}
