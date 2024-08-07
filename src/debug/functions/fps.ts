import { Camera } from "../../camera/entities/Camera";
import { Engine } from "../../bak/engine";

type RenderFn = (engine: Engine, camera: Camera) => Promise<void>;

export function fps(render: RenderFn): RenderFn {
    let last_log_time = Date.now();
    const frame_times = [0];

    return async (engine, camera) => {
        const frame_start_time = Date.now();

        await render(engine, camera);
        await engine.graphics.device.queue.onSubmittedWorkDone();

        const frame_end_time = Date.now();
        frame_times.push(frame_end_time - frame_start_time);
        if (frame_times.length > 120) {
            frame_times.shift();
        }

        if (frame_end_time - last_log_time > 1000) {
            last_log_time = frame_end_time;
            console.log(
                `AVERAGE_FRAME_TIME: ${frame_times.reduce((acc, x) => acc + x) / frame_times.length}`);
        }
    };
}
