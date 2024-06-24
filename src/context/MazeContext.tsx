import React, {createContext, FC, ReactNode, useContext} from "react";
import {Maze, Point} from "@/types";

type MazeContextValue = {
    maze: Maze;
    setMaze: (maze: Maze) => void;
    cellSize: number;
    setCellSize: (cellSize: number) => void;
    start?: Point;
    setStart: (start: Point | null) => void;
    end?: Point;
    setEnd: (end: Point | null) => void;
};

const MazeContext = createContext<MazeContextValue | null>(null);

export const useMazeContext = () => {
    const mazeContext = useContext(MazeContext);
    if (!mazeContext) {
        throw new Error('useMazeContext must be used inside a MazeContextProvider');
    }
    return mazeContext;
};

type MazeContextProps = {
    children: ReactNode;
} & MazeContextValue;

export const MazeContextProvider: FC<MazeContextProps> = props => {
    const { children, maze, setMaze, cellSize, setCellSize, start, setStart, end, setEnd } = props;
    return (
        <MazeContext.Provider value={{ maze, setMaze, cellSize, setCellSize, start, setStart, end, setEnd }}>
            {children}
        </MazeContext.Provider>
    );
};