const PROJECTION_WIDTH: f32 = 16;
const PROJECTION_HEIGHT: f32 = 9;
const PROJECTION_FAR: f32 = 16;

struct VertexOut {
  @builtin(position) position : vec4f,
}

@group(0) @binding(0) var<uniform> camera: mat2x4<f32>;

@vertex
fn vertex_main(@location(0) position: vec4f) -> VertexOut {
  var scale_matrix: mat4x4<f32>;
  scale_matrix[0][0] = 1 / PROJECTION_WIDTH;
  scale_matrix[1][1] = 1 / PROJECTION_HEIGHT;
  scale_matrix[2][2] = 1 / PROJECTION_FAR;
  scale_matrix[3][3] = 1;

  var x_rotation_matrix: mat4x4<f32>;
  x_rotation_matrix[0][0] = 1;
  x_rotation_matrix[1][1] = cos(camera[1][0]);
  x_rotation_matrix[2][1] = -sin(camera[1][0]);
  x_rotation_matrix[1][2] = sin(camera[1][0]);
  x_rotation_matrix[2][2] = cos(camera[1][0]);
  x_rotation_matrix[3][3] = 1;

  var y_rotation_matrix: mat4x4<f32>;
  y_rotation_matrix[0][0] = cos(camera[1][1]);
  y_rotation_matrix[0][2] = -sin(camera[1][1]);
  y_rotation_matrix[1][1] = 1;
  y_rotation_matrix[2][0] = sin(camera[1][1]);
  y_rotation_matrix[2][2] = cos(camera[1][1]);
  y_rotation_matrix[3][3] = 1;

  var translation_matrix: mat4x4<f32>;
  translation_matrix[0][0] = 1;
  translation_matrix[1][1] = 1;
  translation_matrix[2][2] = 1;
  translation_matrix[3][3] = 1;
  translation_matrix[3][0] = -camera[0][0];
  translation_matrix[3][1] = -camera[0][1];
  translation_matrix[3][2] = -camera[0][2];


  var output : VertexOut;
  output.position = vec4(0, 0., 0.5, 0.) + x_rotation_matrix * y_rotation_matrix * scale_matrix * position;
  return output;
}

@fragment
fn fragment_main(fragData: VertexOut) -> @location(0) vec4f {
  return vec4(1.0, 0.0, 0.0, 1.0);
}
