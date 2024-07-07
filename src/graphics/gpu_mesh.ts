import { Mesh } from "../data/mesh";

export interface GpuMesh {
    mesh: Mesh;
    vertexBuffer: GPUBuffer;
}

export function create_gpu_mesh(
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
