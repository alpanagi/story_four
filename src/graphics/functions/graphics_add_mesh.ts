import { Graphics } from "../entities/Graphics";
import { Mesh } from "../../mesh/entities/Mesh";
import { gpu_mesh_create } from "./gpu_mesh_create";

export function graphics_add_mesh(graphics: Graphics, mesh: Mesh): void {
    graphics.gpu_meshes.push(gpu_mesh_create(graphics.device, mesh));
}
