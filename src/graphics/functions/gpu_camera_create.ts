import { Camera } from "../../camera/entities/Camera";
import { GpuCamera } from "../entities/GpuCamera";
import { camera_data_size } from "../../camera/functions/camera_data_size";

export function gpu_camera_create(
    device: GPUDevice,
    camera: Camera,
): GpuCamera {
    const data = new Float32Array(camera_data_size());
    const uniformBuffer = device.createBuffer({
        size: camera_data_size(),
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });
    device.queue.writeBuffer(uniformBuffer, 0, data);

    return {
        camera,
        uniformBuffer,
    };
}
