import {Col} from "@/types/Col";
import {MouseEvent} from "react";

export type MazeColProps = {
    type: Col;
    row: number;
    col: number;
    onClick?: (event: MouseEvent) => void;
};