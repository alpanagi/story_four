import { CAMERA_DATA_SIZE, Camera, camera_data } from "../camera";

export interface GpuCamera {
    camera: Camera;
    uniformBuffer: GPUBuffer;
}

export function create_gpu_camera(
    device: GPUDevice,
    camera: Camera,
): GpuCamera {
    const data = new Float32Array(CAMERA_DATA_SIZE);
    const uniformBuffer = device.createBuffer({
        size: CAMERA_DATA_SIZE,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });
    device.queue.writeBuffer(uniformBuffer, 0, data);

    return {
        camera,
        uniformBuffer,
    };
}

export function gpu_camera_update(device: GPUDevice, gpu_camera: GpuCamera, camera: Camera): void {
    const data = camera_data(camera);
    device.queue.writeBuffer(gpu_camera.uniformBuffer, 0, data);
}
