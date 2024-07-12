import { vec4_data_size } from "../../algebra/functions/vec4/vec4_data_size";

export function camera_data_size(): number {
    return vec4_data_size() * 2;
}
