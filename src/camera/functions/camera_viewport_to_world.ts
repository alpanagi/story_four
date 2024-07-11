import { Camera } from "../entities/Camera";
import { Vec4 } from "../../algebra/entities/Vec4";

const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;

export function camera_viewport_to_world(camera: Camera, x: number, y: number): Vec4 {
    const normalized_x = x / CANVAS_WIDTH;
    const normalized_y = y / CANVAS_HEIGHT;

    return [
        normalized_x * 16 + camera.position[0],
        normalized_y * 9 + camera.position[1],
        camera.position[2],
        1];
}
