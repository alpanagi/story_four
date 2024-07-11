import { Camera } from "../../camera/entities/Camera";
import { GpuCamera } from "../entities/GpuCamera";
import { camera_data } from "../../camera/functions/camera_data";

export function gpu_camera_update(device: GPUDevice, gpu_camera: GpuCamera, camera: Camera): void {
    const data = camera_data(camera);
    device.queue.writeBuffer(gpu_camera.uniformBuffer, 0, data);
}
