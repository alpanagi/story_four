import { Vec4 } from "../../algebra/entities/Vec4";
import { Vertex } from "./Vertex";

export interface Mesh {
    vertices: Vertex[];
    position: Vec4;
    data: Float32Array;
    is_transparent: boolean;
}
