import { Camera } from "../entities/Camera";

export function camera_data(camera: Camera): Float32Array {
    return new Float32Array([...camera.position, ...camera.rotation].flat());
}
