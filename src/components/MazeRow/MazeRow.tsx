import React, {FC} from "react";
import {MazeCol} from "@/components";
import {useMazeContext} from "@/context";
import "./MazeRow.scss";

type MazeRowProps = {
    cols: Array<0 | 1 | 2 | 3>;
    row: number;
};

export const MazeRow: FC<MazeRowProps> = props => {

    const { row, cols } = props;
    const { cellSize } = useMazeContext();

    return (
        <div className='maze-row' style={{ height: `${cellSize}px` }}>
            {cols.map((col, i) => <MazeCol key={`col-${i}`} type={col} row={row} col={i} />)}
        </div>
    );
};