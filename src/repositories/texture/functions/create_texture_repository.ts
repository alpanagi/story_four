import { TextureRepository } from "../../../app/ports/TextureRepository";
import { texture_repository_get } from "./texture_repository_get";

export function create_texture_repository(): TextureRepository {
    return {
        get: texture_repository_get,
    };
}
