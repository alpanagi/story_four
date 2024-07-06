const PROJECTION_WIDTH: f32 = 32;
const PROJECTION_HEIGHT: f32 = 18;
const PROJECTION_FAR: f32 = 16;

struct VertexOut {
  @builtin(position) position : vec4f,
}

@group(0) @binding(0) var<uniform> camera_position: vec4<f32>;
@group(0) @binding(1) var<uniform> camera_rotation: vec4<f32>;

@vertex
fn vertex_main(@location(0) position: vec4f) -> VertexOut {
  var output : VertexOut;
  output.position = vec4(
    (position.x - camera_position.x) / PROJECTION_WIDTH,
    (position.y - camera_position.y) / PROJECTION_HEIGHT,
    (position.z - camera_position.z) / PROJECTION_FAR,
    1.0
  );

  return output;
}

@fragment
fn fragment_main(fragData: VertexOut) -> @location(0) vec4f {
  return vec4(1.0, 0.0, 0.0, 1.0);
}
