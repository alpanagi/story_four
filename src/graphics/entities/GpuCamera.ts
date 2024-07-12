import { Camera } from "../../camera/entities/Camera";

export interface GpuCamera {
    camera: Camera;
    uniform_buffer: GPUBuffer;
}
