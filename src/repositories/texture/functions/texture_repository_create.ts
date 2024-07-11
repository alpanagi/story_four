import { TextureRepository } from "../../../app/ports/TextureRepository";
import { texture_repository_get } from "./texture_repository_get";

export function texture_repository_create(): TextureRepository {
    return {
        get: texture_repository_get,
    };
}
