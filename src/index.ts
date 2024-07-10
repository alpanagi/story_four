import { create_engine, engine_add_mesh, engine_run } from "./engine";
import { load_image } from "./img";
import { load_obj } from "./obj";
import { mesh_offset_uvs } from "./data/mesh";

void main();

async function main(): Promise<void> {
    const tileMesh = await load_obj("tile.obj");
    const characterMesh = await load_obj("character.obj");
    const wallMesh = mesh_offset_uvs(await load_obj("wall.obj"), [1, 0]);
    const hoverMesh = mesh_offset_uvs(await load_obj("hover.obj"), [3, 0]);
    const texture_atlas = await load_image("atlas.png");

    const engine = await create_engine(texture_atlas);

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
