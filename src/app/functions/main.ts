import { MeshKind } from "../../mesh/entities/MeshKind";
import { engine_create } from "../../engine/functions/engine_create";
import { mesh_repository_create } from "../../repositories/mesh/functions/mesh_repository_create";
import { texture_repository_create } from "../../repositories/texture/functions/texture_repository_create";
import { engine_add_mesh } from "../../engine/functions/engine_add_mesh";
import { engine_run } from "../../engine/functions/engine_run";
import { mesh_offset_uvs } from "../../mesh/functions/mesh_offset_uvs";

export async function main(): Promise<void> {
    const mesh_repository = mesh_repository_create();
    const texture_repository = texture_repository_create();

    const tileMesh = await mesh_repository.get(MeshKind.Tile);
    const characterMesh = await mesh_repository.get(MeshKind.Character);
    const wallMesh = mesh_offset_uvs(await mesh_repository.get(MeshKind.Wall), [1, 0]);
    const hoverMesh = mesh_offset_uvs(await mesh_repository.get(MeshKind.Hover), [3, 0]);
    const texture_atlas = await texture_repository.get("atlas.png");

    const engine = await engine_create(texture_atlas);

    for (const j of [...Array(100).keys()]) {
        for (const i of [...Array(100).keys()]) {
            engine_add_mesh(engine, { ...tileMesh, position: [1.7 * i, 0, 1.7 * j, 0] });
        }
    }

    for (const i of [...Array(100).keys()]) {
        engine_add_mesh(engine, {
            ...wallMesh,
            position: [1.7 * (i + 1), 0, 1.7 * (i + 1), 0],
        });
    }
    engine_add_mesh(engine, {
        ...hoverMesh,
        position: [1.7 * 4, 0, 1.7, 0],
    });

    engine_add_mesh(engine, { ...mesh_offset_uvs(characterMesh, [2.0, 0.0]), position: [0, 0, 0, 0] });

    await engine_run(engine, engine.camera);
}
