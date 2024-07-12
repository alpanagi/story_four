import { Level } from "../../entity/Level";
import { Mesh } from "../../../mesh/entities/Mesh";
import { MeshKind } from "../../../mesh/entities/MeshKind";
import { mesh_offset_uvs } from "../../../mesh/functions/mesh_offset_uvs";
import { mesh_repository } from "../../../state";

export async function level_create(): Promise<Level> {
    const tileMesh = await mesh_repository.get(MeshKind.Tile);
    const characterMesh = await mesh_repository.get(MeshKind.Character);
    const wallMesh = mesh_offset_uvs(await mesh_repository.get(MeshKind.Wall), [1, 0]);
    const hoverMesh = mesh_offset_uvs(await mesh_repository.get(MeshKind.Hover), [3, 0]);

    const meshes: Mesh[] = [];
    for (const j of [...Array(100).keys()]) {
        for (const i of [...Array(100).keys()]) {
            meshes.push({ ...tileMesh, position: [1.7 * i, 0, 1.7 * j, 0] });
        }
    }
    for (const i of [...Array(100).keys()]) {
        meshes.push({ ...wallMesh, position: [1.7 * (i + 1), 0, 1.7 * (i + 1), 0] });
    }
    meshes.push({ ...hoverMesh, position: [1.7 * 4, 0, 1.7, 0] });
    meshes.push({ ...mesh_offset_uvs(characterMesh, [2.0, 0.0]), position: [0, 0, 0, 0] });

    return {
        meshes,
    };
}
