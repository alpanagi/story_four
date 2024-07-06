import { Camera } from "./camera";
import { Engine } from "./engine";

type RenderFn = (engine: Engine, camera: Camera) => Promise<void>;

export const fps = (render: RenderFn): RenderFn => {
    let last_log_time = Date.now();
    const frame_times = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    return async (engine, camera) => {
        const frame_start_time = Date.now();

        render(engine, camera);
        await engine.graphics.device.queue.onSubmittedWorkDone();

        const frame_end_time = Date.now();
        frame_times.push(frame_end_time - frame_start_time);
        if (frame_times.length > 100) {
            frame_times.shift();
        }

        if (frame_end_time - last_log_time > 1000) {
            last_log_time = frame_end_time;
            console.log(
                `AVERAGE_FPS: ${frame_times.reduce((acc, x) => acc + x) / frame_times.length}`);
        }
    };
};
