import { Mesh } from "../../mesh/entities/Mesh";
import { Vec4 } from "../../algebra/entities/Vec4";

export interface Tile {
    mesh: Mesh;
    position: Vec4;
    data: Float32Array;

    // collider:
}
