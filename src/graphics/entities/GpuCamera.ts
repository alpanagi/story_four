import { Camera } from "../../camera/entities/Camera";

export interface GpuCamera {
    camera: Camera;
    uniformBuffer: GPUBuffer;
}
