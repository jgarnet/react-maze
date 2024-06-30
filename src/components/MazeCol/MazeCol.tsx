import React, {FC, MouseEvent} from 'react';
import {useMazeContext} from "@/context";
import {MazeColProps} from "@/types";
import "./MazeCol.scss";

const types = ['path', 'wall', 'start', 'end'];

export const MazeCol: FC<MazeColProps> = props => {
    const { type, row, col } = props;
    const { cellSize, getCellClassName, onCellClick, onCellHover } = useMazeContext();
    let className = `maze-col ${types[type]}`;
    if (getCellClassName) {
        className += ` ${getCellClassName(row, col)}`;
    }
    const handleClick = (event: MouseEvent) => {
        if (onCellClick) {
            onCellClick(event, row, col);
        }
    }
    const handleHover = (event: MouseEvent) => {
        if (onCellHover) {
            onCellHover(event, row, col);
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