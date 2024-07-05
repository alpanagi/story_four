import { Mesh } from "../data/mesh";

export interface GpuMesh {
    mesh: Mesh;
    vertexBuffer: GPUBuffer;
}

export function create_gpu_mesh(
    device: GPUDevice,
    mesh: Mesh,
): GpuMesh {
    const vertexBuffer = device.createBuffer({
        size: mesh.vertex_data_size(),
        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    });
    const data = mesh.vertex_data();
    device.queue.writeBuffer(vertexBuffer, 0, data, 0, data.length);

    return {
        mesh,
        vertexBuffer,
    };
}
