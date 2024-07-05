import { Mesh, create_mesh } from "./data/mesh";
import { Vertex } from "./data/vertex";

export async function load_obj(filename: string): Promise<Mesh> {
    const data = await fetch(`assets/meshes/${filename}`);
    const text = await data.text();
    const lines = text.split("\n");

    const vertices: Vertex[] = [];
    lines.forEach(line => {
        if (line.startsWith("v ")) {
            const parts = line.split(" ");
            vertices.push({
                position: [
                    parseFloat(parts[1] ?? "0"),
                    parseFloat(parts[2] ?? "1"),
                    parseFloat(parts[3] ?? "2"),
                    1.0,
                ],
            });
        }
    });

    return create_mesh(vertices);
}
