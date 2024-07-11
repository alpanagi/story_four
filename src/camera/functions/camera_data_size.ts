import { vertex_data_size } from "../../mesh/functions/vertex_data_size";

export function camera_data_size(): number {
    return vertex_data_size() * 2;
}
