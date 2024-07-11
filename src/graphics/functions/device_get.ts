export async function device_get(): Promise<GPUDevice> {
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
