import {MouseEvent, useState} from "react";
import {FillMode, Point} from "@/types";
import {MazeState} from "@/types/MazeState";

export const useMazeEditor = (mazeState: MazeState) => {
    const { maze, setMaze, start, setStart, end, setEnd } = mazeState;
    // toggles what fill mode is used when cells are clicked during editing
    const [fillMode, _setFillMode] = useState<FillMode>('fill');
    // keeps track of what cells to fill during editing
    const [fillStartPoint, setFillStartPoint] = useState<Point | null>(null);
    const [currentHoverPoint, setCurrentHoverPoint] = useState<Point | null>(null);
    const setFillMode = (fillMode: FillMode) => {
        _setFillMode(fillMode);
        if (['fill', 'remove'].indexOf(fillMode) === -1) {
            // clear hover state if switching out of fill / remove mode
            setCurrentHoverPoint(null);
            setFillStartPoint(null);
        }
    };
    // remove old start / end references if the cell is overwritten
    const clearStartAndEnd = (row: number, col: number) => {
        if (start?.x === col && start?.y === row) {
            setStart(null);
        } else if (end?.x === col && end?.y === row) {
            setEnd(null);
        }
    };
    const setCol = (row: number, col: number, value: 0 | 1 | 2 | 3) => {
        maze[row][col] = value;
        clearStartAndEnd(row, col);
        setMaze([...maze]);
    };
    const onFill = (row: number, col: number) => {
        switch (fillMode) {
            case 'fill':
            case 'remove':
                if (fillStartPoint) {
                    // fill / remove all cells between the fillStartPoint cell and the current cell
                    const maxRow = Math.max(row, fillStartPoint.y);
                    const minRow = Math.min(row, fillStartPoint.y);
                    const maxCol = Math.max(col, fillStartPoint.x);
                    const minCol = Math.min(col, fillStartPoint.x);
                    for (let i = minRow; i <= maxRow; i++) {
                        for (let j = minCol; j <= maxCol; j++) {
                            maze[i][j] = fillMode === 'fill' ? 1 : 0;
                            clearStartAndEnd(i, j);
                        }
                    }
                    setMaze([...maze]);
                    setFillStartPoint(null);
                } else {
                    // keep track of the first cell clicked during fill/remove mode
                    setFillStartPoint({ x: col, y: row });
                }
                break;
            case 'start':
                // clear current start state, then set start cell
                if (start) {
                    setCol(start.y, start.x, 0);
                }
                setStart({ x: col, y: row });
                setCol(row, col, 2);
                break;
            case 'end':
                // clear current end state, then set end cell
                if (end) {
                    setCol(end.y, end.x, 0);
                }
                setEnd({ x: col, y: row });
                setCol(row, col, 3);
                break;
        }
    };
    const onCellClick = (event: MouseEvent, row: number, col: number) => {
        onFill(row, col);
    };
    const onCellHover = (event: MouseEvent, row: number, col: number) => {
        if (['fill', 'remove'].indexOf(fillMode) !== -1) {
            setCurrentHoverPoint({ x: col, y: row });
        }
    };
    const getCellClassName = (row: number, col: number) => {
        let className = ' edit';
        // determine if current cell is within bounds of fill range
        // if so, highlight the current cell based on the fill mode
        if (fillStartPoint && currentHoverPoint) {
            const minX = Math.min(fillStartPoint.x, currentHoverPoint.x);
            const maxX = Math.max(fillStartPoint.x, currentHoverPoint.x);
            const minY = Math.min(fillStartPoint.y, currentHoverPoint.y);
            const maxY = Math.max(fillStartPoint.y, currentHoverPoint.y);
            if (row >= minY && row <= maxY && col >= minX && col <= maxX) {
                className += ` ${fillMode}`;
            }
        }
        return className;
    };
    return {
        fillMode,
        setFillMode,
        onFill,
        onCellClick,
        onCellHover,
        getCellClassName
    };
};