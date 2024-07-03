import {useState} from "react";
import {Maze, Point} from "@/types";
import {MazeState} from "@/types/MazeState";

export const useMaze: () => MazeState = () => {
    // initialize App state
    const [maze, setMaze] = useState<Maze>([]);
    const [cellSize, setCellSize] = useState<number>(25);
    const [start, setStart] = useState<Point | null>(null);
    const [end, setEnd] = useState<Point | null>(null);
    return { maze, setMaze, cellSize, setCellSize, start, setStart, end, setEnd };
};