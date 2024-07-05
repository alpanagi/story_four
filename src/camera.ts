import { Vec4 } from "./data/vec4";

export interface Camera {
    position: Vec4;
    rotation: Vec4;
}

export function create_camera(): Camera {
    return {
        position: [0, 0, 0, 1],
        rotation: [0, 0, 0, 0],
    };
}
