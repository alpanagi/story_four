import { Mesh } from "../../../mesh/entities/Mesh";
import { MeshKind } from "../../../mesh/entities/MeshKind";
import { Vec2 } from "../../../algebra/entities/Vec2";
import { Vec4 } from "../../../algebra/entities/Vec4";
import { Vertex } from "../../../mesh/entities/Vertex";
import { create_mesh } from "../../../mesh/functions/create_mesh";

export async function mesh_repository_get(mesh_kind: MeshKind): Promise<Mesh> {
    switch (mesh_kind) {
        case MeshKind.Character:
            return await load_obj("character.obj");
        case MeshKind.Hover:
            return await load_obj("hover.obj");
        case MeshKind.Tile:
            return await load_obj("tile.obj");
        case MeshKind.Wall:
            return await load_obj("wall.obj");
    }
}

export async function load_obj(filename: string): Promise<Mesh> {
    const data = await fetch(`assets/meshes/${filename}`);
    const text = await data.text();
    const lines = text.split("\n");

    const positions: Vec4[] = [];
    const uvs: Vec2[] = [];
    const faces: [[number, number], [number, number], [number, number]][] = [];

    lines.forEach(line => {
        if (line.startsWith("v ")) {
            const parts = line.split(" ");
            positions.push([
                parseFloat(parts[1] ?? "0"),
                parseFloat(parts[2] ?? "0"),
                parseFloat(parts[3] ?? "0"),
                1.0,
            ]);
        }
        if (line.startsWith("vt ")) {
            const parts = line.split(" ");
            uvs.push([
                parseFloat(parts[1] ?? "0"),
                parseFloat(parts[2] ?? "0"),
            ]);
        }
        if (line.startsWith("f ")) {
            const parts = line.split(" ");
            parts.shift();

            const face: [[number, number], [number, number], [number, number]] = [[1, 1], [1, 1], [1, 1]];
            parts.forEach((part, idx) => {
                const inner_parts = part.split("/");
                face[idx] = [parseFloat(inner_parts[0] ?? "1"), parseFloat(inner_parts[1] ?? "1")];
            });
            faces.push(face);
        }
    });

    const vertices: Vertex[] = [];
    faces.forEach(face => {
        face.forEach(x => vertices.push({
            position: positions[x[0] - 1] ?? [0, 0, 0, 1],
            uv: uvs[x[1] - 1] ?? [0, 0],
        }));
    });

    return create_mesh(vertices);
}
