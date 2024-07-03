import {Point} from "@/types";

export const Directions: Map<string, Point> = new Map([
    ['ArrowUp', { x: 0, y: -1 }],
    ['ArrowDown', { x: 0, y: 1 }],
    ['ArrowLeft', { x: -1, y: 0 }],
    ['ArrowRight', { x: 1, y: 0 }]
]);