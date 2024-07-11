import { Camera } from "../../camera/entities/Camera";
import { Graphics } from "../../graphics/entities/Graphics";
import { Input } from "../../input/entities/Input";
import { Mesh } from "../../mesh/entities/Mesh";

export interface Engine {
    graphics: Graphics;
    input: Input;
    camera: Camera;
    meshes: Mesh[];
}
