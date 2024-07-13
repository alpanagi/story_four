// @ts-expect-error: esbuild will import this as text
import shader from "../shader.wgsl";

export function render_pipeline_create(device: GPUDevice): GPURenderPipeline {
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
                {
                    shaderLocation: 1, // uv
                    offset: 16,
                    format: "float32x2",
                },
            ],
            arrayStride: 24,
            stepMode: "vertex",
        },
    ];

    const cameraBufferLayout = device.createBindGroupLayout({
        entries: [
            {
                binding: 0,
                visibility: GPUShaderStage.VERTEX,
                buffer: {},
            },
        ],
    });

    const texture_atlas_buffer_layout = device.createBindGroupLayout({
        entries: [
            {
                binding: 0,
                visibility: GPUShaderStage.FRAGMENT,
                sampler: {},
            },
            {
                binding: 1,
                visibility: GPUShaderStage.FRAGMENT,
                texture: {},
            },
        ],
    });

    const transform_buffer_layout = device.createBindGroupLayout({
        entries: [
            {
                binding: 0,
                visibility: GPUShaderStage.VERTEX,
                buffer: { hasDynamicOffset: true },
            },
        ],
    });

    const pipelineLayout = device.createPipelineLayout({
        bindGroupLayouts: [cameraBufferLayout, texture_atlas_buffer_layout, transform_buffer_layout],
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
                    blend: {
                        color: {
                            operation: "add",
                            srcFactor: "one",
                            dstFactor: "one-minus-src-alpha",
                        },
                        alpha: {},
                    },
                },
            ],
        },
        primitive: {
            topology: "triangle-list",
        },
        depthStencil: {
            depthWriteEnabled: true,
            depthCompare: "less",
            format: "depth24plus",
        },
        layout: pipelineLayout,
    };

    return device.createRenderPipeline(pipelineDescriptor);
}
