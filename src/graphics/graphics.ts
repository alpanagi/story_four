import { Camera, create_camera } from "../camera";
import { GpuCamera, create_gpu_camera, gpu_camera_update } from "./gpu_camera";
import { GpuMesh, create_gpu_mesh } from "./gpu_mesh";
import { Mesh } from "../data/mesh";
// @ts-expect-error: esbuild will import this as text
import shader from "../shader.wgsl";

export interface Graphics {
    canvas_context: GPUCanvasContext;
    device: GPUDevice;
    render_pipeline: GPURenderPipeline;
    gpu_meshes: GpuMesh[];
    gpu_camera: GpuCamera;
    camera_bind_group: GPUBindGroup;
}

export async function init_graphics(): Promise<Graphics> {
    const device = await get_device();
    const canvas_context = get_canvas_context(device);
    const render_pipeline = create_render_pipeline(device);
    const gpu_camera = create_gpu_camera(device, create_camera());
    const camera_bind_group = create_camera_bind_group(
        device,
        render_pipeline,
        gpu_camera,
    );

    return {
        device,
        canvas_context,
        render_pipeline,
        gpu_meshes: [],
        gpu_camera,
        camera_bind_group,
    };
}

async function get_device(): Promise<GPUDevice> {
    if (!navigator.gpu) {
        throw new Error("WebGPU not supported");
    }

    const adapter = await navigator.gpu.requestAdapter();
    if (!adapter) {
        throw new Error("Couldn't get WebGPU adapter");
    }

    const device = await adapter.requestDevice();
    if (!adapter) {
        throw new Error("Couldn't get logical device");
    }

    return device;
}

function get_canvas_context(device: GPUDevice): GPUCanvasContext {
    const canvas = document.querySelector(
        "#render_window",
    )! as HTMLCanvasElement;
    if (canvas === null) {
        throw new Error("Couldn't get render_window canvas");
    }

    const context = canvas.getContext("webgpu");
    if (context === null) {
        throw new Error("Couldn't get WebGPU context from canvas");
    }

    context.configure({
        device,
        format: navigator.gpu.getPreferredCanvasFormat(),
    });

    return context;
}

function create_camera_bind_group(
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

function create_render_pipeline(device: GPUDevice): GPURenderPipeline {
    const shaderModule = device.createShaderModule({
        code: shader,
    });

    const vertexBuffersLayout: [GPUVertexBufferLayout] = [
        {
            attributes: [
                {
                    shaderLocation: 0, // position
                    offset: 0,
                    format: "float32x4",
                },
            ],
            arrayStride: 16,
            stepMode: "vertex",
        },
    ];

    const uniformBuffersLayout = device.createBindGroupLayout({
        entries: [
            {
                binding: 0,
                visibility: GPUShaderStage.VERTEX,
                buffer: {},
            },
        ],
    });

    const pipelineLayout = device.createPipelineLayout({
        bindGroupLayouts: [uniformBuffersLayout],
    });

    const pipelineDescriptor: GPURenderPipelineDescriptor = {
        vertex: {
            module: shaderModule,
            entryPoint: "vertex_main",
            buffers: vertexBuffersLayout,
        },
        fragment: {
            module: shaderModule,
            entryPoint: "fragment_main",
            targets: [
                {
                    format: navigator.gpu.getPreferredCanvasFormat(),
                },
            ],
        },
        primitive: {
            topology: "triangle-list",
        },
        layout: pipelineLayout,
    };

    return device.createRenderPipeline(pipelineDescriptor);
}

export function graphics_add_mesh(graphics: Graphics, mesh: Mesh): void {
    graphics.gpu_meshes.push(create_gpu_mesh(graphics.device, mesh));
}

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
    };

    const passEncoder = command_encoder.beginRenderPass(render_pass_descriptor);
    passEncoder.setPipeline(graphics.render_pipeline);

    passEncoder.setBindGroup(0, graphics.camera_bind_group);
    for (const gpu_mesh of graphics.gpu_meshes) {
        passEncoder.setVertexBuffer(0, gpu_mesh.vertexBuffer);
        passEncoder.draw(gpu_mesh.mesh.vertices.length);
    }

    passEncoder.end();
    graphics.device.queue.submit([command_encoder.finish()]);
}
