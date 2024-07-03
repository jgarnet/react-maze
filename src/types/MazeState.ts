import {Maze} from "@/types/Maze";
import {Point} from "@/types/Point";

export type MazeState = {
    maze: Maze;
    setMaze: (maze: Maze) => void;
    cellSize: number;
    setCellSize: (cellSize: number) => void;
    start: Point | null;
    setStart: (start: Point | null) => void;
    end: Point | null;
    setEnd: (end: Point | null) => void;
};