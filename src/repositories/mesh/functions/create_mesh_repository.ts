import { MeshRepository } from "../../../app/ports/MeshRepository";
import { mesh_repository_get } from "./mesh_repository_get";

export function create_mesh_repository(): MeshRepository {
    return {
        get: mesh_repository_get,
    };
}
