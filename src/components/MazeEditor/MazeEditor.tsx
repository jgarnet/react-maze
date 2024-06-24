import React, {useState} from 'react';
import {FillMode, Point} from "@/types";
import {MazeEditorContextProvider, useMazeContext} from "@/context";
import {FillModeControl, MazeExporter, MazeImporter, MazeInitializer, MazeViewer} from "@/components";
import {useSearchParams} from "react-router-dom";

export const MazeEditor = () => {
    /* State Management Operations */
    const [searchParams] = useSearchParams();
    const { maze, setMaze, start, setStart, end, setEnd } = useMazeContext();
    // toggles what fill mode is used when cells are clicked during editing
    const [fillMode, _setFillMode] = useState<FillMode>('fill');
    // keeps track of what cells to fill during editing
    const [fillStartPoint, setFillStartPoint] = useState<Point>(null);
    const [currentHoverPoint, setCurrentHoverPoint] = useState<Point>(null);
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
                            setMaze([...maze]);
                        }
                    }
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
    /* Render Operations */
    // if no maze state exists, import or build maze
    if (!maze || maze.length === 0) {
        if (searchParams.get('import') === 'true') {
            return <MazeImporter />;
        } else {
            return <MazeInitializer />;
        }
    }
    return (
        <div className='col-container maze-editor'>
            <MazeEditorContextProvider
                setCol={setCol}
                fillMode={fillMode}
                setFillMode={setFillMode}
                onFill={onFill}
                currentHoverPoint={currentHoverPoint}
                setCurrentHoverPoint={setCurrentHoverPoint}
                fillStartPoint={fillStartPoint}
            >
                <FillModeControl />
                <MazeExporter />
                <MazeViewer />
            </MazeEditorContextProvider>
        </div>
    );
};