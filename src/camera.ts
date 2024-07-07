import { VEC4_DATA_SIZE, Vec4 } from "./math/vec4";

export const CAMERA_DATA_SIZE = VEC4_DATA_SIZE * 2;

export interface Camera {
    position: Vec4;
    rotation: Vec4;
}

export function create_camera(): Camera {
    return {
        position: [0, 0, 0, 0],
        rotation: [0.785, 0.785, 0, 0],
    };
}

export function camera_data(camera: Camera): Float32Array {
    return new Float32Array([...camera.position, ...camera.rotation].flat());
}
