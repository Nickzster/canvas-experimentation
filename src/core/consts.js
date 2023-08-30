export const X = 0;
export const Y = 1;

export const CANVAS_WIDTH = 1024;
export const CANVAS_HEIGHT = 768;

const canvas = document.getElementById("sandbox");
export const ctx = canvas.getContext("2d");

export const MAX_ENTITIES = 100;

export const COLLISION_TYPES = {
  OBJECT_TO_OBJECT: 0,
  OUT_OF_BOUNDS: 1,
};
