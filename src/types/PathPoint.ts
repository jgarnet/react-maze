import {Point} from "@/types/Point";

export type PathPoint = Point & {
    prev?: PathPoint;
};