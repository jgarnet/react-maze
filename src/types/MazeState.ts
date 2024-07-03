import {Maze} from "@/types/Maze";
import {Point} from "@/types/Point";

export type MazeState = {
    maze: Maze;
    setMaze: (maze: Maze) => void;
    cellSize: number;
    setCellSize: (cellSize: number) => void;
    start: Point;
    setStart: (start: Point) => void;
    end: Point;
    setEnd: (end: Point) => void;
};