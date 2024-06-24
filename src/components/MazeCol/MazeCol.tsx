import React, {FC, MouseEvent} from 'react';
import {useMazeContext, useMazeEditorContext, useMazeSolverContext} from "@/context";
import {MazeColProps} from "@/types";
import './MazeCol.scss';

const types = ['path', 'wall', 'start', 'end'];

export const MazeCol: FC<MazeColProps> = props => {
    const { type, row, col } = props;
    const { cellSize } = useMazeContext();
    const editorContext = useMazeEditorContext();
    const solverContext = useMazeSolverContext();
    let className = `maze-col ${types[type]}`;
    if (editorContext) {
        className += ' edit';
        const { fillStartPoint, currentHoverPoint, fillMode } = editorContext;
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
    }
    // if in solver mode, highlight the cell as a 'solution' cell
    if (solverContext?.points?.size > 0 && solverContext?.points.has(`${col},${row}`)) {
        className += ' solution';
    }
    const handleClick = () => {
        if (editorContext) {
            editorContext.onFill(row, col);
        }
    };
    const handleHover = (event: MouseEvent) => {
        if (editorContext && ['fill', 'remove'].indexOf(editorContext.fillMode) !== -1) {
            editorContext.setCurrentHoverPoint({ x: col, y: row });
        }
    };
    return (
        <div
            className={className}
            style={{ width: `${cellSize}px` }}
            onClick={handleClick}
            onMouseOver={handleHover}
        ></div>
    );
};