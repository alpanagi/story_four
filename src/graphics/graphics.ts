import { GpuCamera, create_gpu_camera } from "./gpu_camera";
import { GpuMesh, create_gpu_mesh } from "./gpu_mesh";
import { Mesh } from "../data/mesh";
import { create_camera } from "../camera";
// @ts-expect-error: esbuild will import this as text
import shader from "../shader.wgsl";

export interface Graphics {
    canvas_context: GPUCanvasContext;
    device: GPUDevice;
    render_pipeline: GPURenderPipeline;
    gpu_meshes: GpuMesh[];
    gpu_camera: GpuCamera;
    camera_bind_group: GPUBindGroup;

    add_mesh: (mesh: Mesh) => void;
    render: () => void;
}

export async function init_graphics(): Promise<Graphics> {
    const device = await get_device();
    const canvas_context = await get_canvas_context(device);
    const render_pipeline = await create_render_pipeline(device);
    const gpu_camera = await create_gpu_camera(device, create_camera());
    const camera_bind_group = create_camera_bind_group(
        device,
        render_pipeline,
        gpu_camera,
    );

    return {
        camera_bind_group,
        canvas_context,
        device,
        render_pipeline,
        gpu_meshes: [],
        gpu_camera,

        add_mesh,
        render,
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

export function add_mesh(this: Graphics, mesh: Mesh): void {
    this.gpu_meshes.push(create_gpu_mesh(this.device, mesh));
}

export function render(this: Graphics): void {
    const commandEncoder = this.device.createCommandEncoder();
    const renderPassDescriptor: GPURenderPassDescriptor = {
        colorAttachments: [
            {
                clearValue: { r: 0, g: 0, b: 0, a: 1 },
                loadOp: "clear",
                storeOp: "store",
                view: this.canvas_context
                    .getCurrentTexture()
                    .createView(),
            },
        ],
    };

    const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
    passEncoder.setPipeline(this.render_pipeline);

    passEncoder.setBindGroup(0, this.camera_bind_group);
    for (const gpuMesh of this.gpu_meshes) {
        passEncoder.setVertexBuffer(0, gpuMesh.vertexBuffer);
        passEncoder.draw(gpuMesh.mesh.vertices.length);
    }

    passEncoder.end();
    this.device.queue.submit([commandEncoder.finish()]);
}
