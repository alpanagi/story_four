import { GpuMesh } from "../entities/GpuMesh";
import { Mesh } from "../../mesh/entities/Mesh";

export function gpu_mesh_create(
    device: GPUDevice,
    mesh: Mesh,
): GpuMesh {
    const data = mesh.data;
    const vertexBuffer = device.createBuffer({
        size: data.length * 4,
        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    });
    device.queue.writeBuffer(vertexBuffer, 0, data, 0, data.length);

    return {
        mesh,
        vertexBuffer,
    };
}
