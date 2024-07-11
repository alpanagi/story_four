export function canvas_context_get(device: GPUDevice): GPUCanvasContext {
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
