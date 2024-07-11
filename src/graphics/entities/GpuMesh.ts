import { Mesh } from "../../mesh/entities/Mesh";

export interface GpuMesh {
    mesh: Mesh;
    vertexBuffer: GPUBuffer;
}
