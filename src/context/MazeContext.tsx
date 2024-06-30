import React, {createContext, FC, MouseEvent, ReactNode, useContext} from "react";
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
    onCellClick?: (event: MouseEvent, row: number, col: number) => void;
    onCellHover?: (event: MouseEvent, row: number, col: number) => void;
    getCellClassName?: (row: number, col: number) => string;
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
    const {
        children,
        maze,
        setMaze,
        cellSize,
        setCellSize,
        start,
        setStart,
        end,
        setEnd,
        onCellClick,
        onCellHover,
        getCellClassName
    } = props;
    return (
        <MazeContext.Provider value={{
            maze,
            setMaze,
            cellSize,
            setCellSize,
            start,
            setStart,
            end,
            setEnd,
            onCellClick,
            onCellHover,
            getCellClassName
        }}>
            {children}
        </MazeContext.Provider>
    );
};