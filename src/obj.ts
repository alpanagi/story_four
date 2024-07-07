import { Mesh, create_mesh } from "./data/mesh";
import { Vec4 } from "./math/vec4";
import { Vertex } from "./data/vertex";

export async function load_obj(filename: string): Promise<Mesh> {
    const data = await fetch(`assets/meshes/${filename}`);
    const text = await data.text();
    const lines = text.split("\n");

    const positions: Vec4[] = [];
    const faces: [number, number, number][] = [];

    lines.forEach(line => {
        if (line.startsWith("v ")) {
            const parts = line.split(" ");
            positions.push([
                parseFloat(parts[1] ?? "0"),
                parseFloat(parts[2] ?? "1"),
                parseFloat(parts[3] ?? "2"),
                1.0,
            ]);
        }
        if (line.startsWith("f ")) {
            const parts = line.split(" ");
            parts.shift();

            const face: [number, number, number] = [1, 1, 1];
            parts.forEach((part, idx) => {
                const inner_parts = part.split("/");
                face[idx] = parseFloat(inner_parts[0] ?? "1");
            });
            faces.push(face);
        }
    });

    const vertices: Vertex[] = [];
    faces.forEach(face => {
        face.forEach(x => vertices.push({
            position: positions[x - 1] ?? [0, 0, 0, 1],
        }));
    });
    return create_mesh(vertices);
}
