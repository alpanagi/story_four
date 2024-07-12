import { Camera } from "../../camera/entities/Camera";
import { GpuCamera } from "../entities/GpuCamera";
import { camera_data_size } from "../../camera/functions/camera_data_size";

export function gpu_camera_create(
    device: GPUDevice,
    camera: Camera,
): GpuCamera {
    const uniform_buffer = device.createBuffer({
        label: "camera_buffer",
        size: camera_data_size(),
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });

    return {
        camera,
        uniform_buffer: uniform_buffer,
    };
}
