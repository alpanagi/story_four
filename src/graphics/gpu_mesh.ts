import { Mesh, mesh_vertex_data, mesh_vertex_data_size } from "../data/mesh";

export interface GpuMesh {
    mesh: Mesh;
    vertexBuffer: GPUBuffer;
}

export function create_gpu_mesh(
    device: GPUDevice,
    mesh: Mesh,
): GpuMesh {
    const vertexBuffer = device.createBuffer({
        size: mesh_vertex_data_size(mesh),
        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    });
    const data = mesh_vertex_data(mesh);
    device.queue.writeBuffer(vertexBuffer, 0, data, 0, data.length);

    return {
        mesh,
        vertexBuffer,
    };
}
