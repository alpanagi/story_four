import { Graphics } from "../entities/Graphics";
import { Mesh } from "../../mesh/entities/Mesh";
import { create_gpu_mesh } from "./create_gpu_mesh";

export function graphics_add_mesh(graphics: Graphics, mesh: Mesh): void {
    graphics.gpu_meshes.push(create_gpu_mesh(graphics.device, mesh));
}
