import { Mesh } from "../../mesh/entities/Mesh";
import { MeshKind } from "../../mesh/entities/MeshKind";

export interface MeshRepository {
    get(mesh_kind: MeshKind): Promise<Mesh>;
}
