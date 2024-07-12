import { mesh_repository_create } from "./repositories/mesh/functions/mesh_repository_create";
import { texture_repository_create } from "./repositories/texture/functions/texture_repository_create";

export const mesh_repository = mesh_repository_create();
export const texture_repository = texture_repository_create();
