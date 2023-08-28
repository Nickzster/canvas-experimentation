export const COMPONENT_TYPES = {
  BOX_COLLISION_COMPONENT_TYPE: 0,
  BOX_MODEL_COMPONENT_TYPE: 1,
  LOCATION_COMPONENT_TYPE: 2,
  VELOCITY_COMPONENT_TYPE: 3,
};

export const X = 0;
export const Y = 1;

export const CANVAS_WIDTH = 768;
export const CANVAS_HEIGHT = 512;

const canvas = document.getElementById("sandbox");
export const ctx = canvas.getContext("2d");

export const MAX_ENTITIES = 10;
