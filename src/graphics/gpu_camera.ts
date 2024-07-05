import { Camera } from "../camera";

export interface GpuCamera {
    camera: Camera;
    uniformBuffer: GPUBuffer;
}

export function create_gpu_camera(
    device: GPUDevice,
    camera: Camera,
): GpuCamera {
    const data = new Float32Array(4);
    const uniformBuffer = device.createBuffer({
        size: 4 * 4,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });
    device.queue.writeBuffer(uniformBuffer, 0, data);

    return {
        camera,
        uniformBuffer,
    };
}
