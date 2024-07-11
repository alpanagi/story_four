import { MeshRepository } from "../../../app/ports/MeshRepository";
import { mesh_repository_get } from "./mesh_repository_get";

export function mesh_repository_create(): MeshRepository {
    return {
        get: mesh_repository_get,
    };
}
