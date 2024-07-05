struct VertexOut {
  @builtin(position) position : vec4f,
}

@group(0) @binding(0) var<uniform> camera_position: vec4<f32>;

@vertex
fn vertex_main(@location(0) position: vec4f) -> VertexOut {
  var output : VertexOut;
  output.position = position + camera_position;

  return output;
}

@fragment
fn fragment_main(fragData: VertexOut) -> @location(0) vec4f {
  return vec4(1.0, 0.0, 0.0, 1.0);
}
