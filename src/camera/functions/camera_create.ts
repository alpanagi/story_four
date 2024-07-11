import { Camera } from "../entities/Camera";

export function camera_create(): Camera {
    return {
        position: [0, 0, 0, 0],
        rotation: [0.785, 0.785, 0, 0],
    };
}
