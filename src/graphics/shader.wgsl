const PROJECTION_WIDTH: f32 = 16;
const PROJECTION_HEIGHT: f32 = 9;
const PROJECTION_FAR: f32 = 1000;

const ATLAS_CELL_SIZE: f32 = 16;

struct VertexInput {
  @location(0) position: vec4<f32>,
  @location(1) uv: vec2<f32>
}

struct VertexOutput {
  @builtin(position) position: vec4<f32>,
  @location(0) uv: vec2<f32>
}

@group(0) @binding(0) var<uniform> camera: mat2x4<f32>;

@group(1) @binding(0) var texture_atlas_sampler: sampler;
@group(1) @binding(1) var texture_atlas: texture_2d<f32>;

@vertex
fn vertex_main(input: VertexInput) -> VertexOutput {
  var projection: mat4x4<f32>;
  projection[0][0] = 2 / PROJECTION_WIDTH;
  projection[1][1] = 2 / PROJECTION_HEIGHT;
  projection[2][2] = -2 / PROJECTION_FAR;
  projection[3][3] = 1;

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

  var output : VertexOutput;
  output.position = vec4(0, 0., 0.5, 0.) + projection * x_rotation_matrix * y_rotation_matrix * translation_matrix * input.position;
  output.uv = input.uv;
  return output;
}

@fragment
fn fragment_main(input: VertexOutput) -> @location(0) vec4<f32> {
  return textureSample(texture_atlas, texture_atlas_sampler, input.uv / ATLAS_CELL_SIZE);
}
