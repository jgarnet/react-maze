import React, {FC} from "react";
import {useMazeContext} from "@/context";
import {Maze} from "@/types";

type MazeHistoryProps = {
    undo: () => Maze | undefined;
    redo: () => Maze | undefined;
    canUndo: () => boolean;
    canRedo: () => boolean;
};
export const MazeHistory: FC<MazeHistoryProps> = props => {
    const { undo, redo, canUndo, canRedo } = props;
    const { setMaze } = useMazeContext();
    const onUndo = () => {
        setMaze(undo());
    };
    const onRedo = () => {
        setMaze(redo());
    };
    return (
        <div className='row-container'>
            <input type='button' value='Undo' onClick={onUndo} disabled={!canUndo()} />
            <input type='button' value='Redo' onClick={onRedo} disabled={!canRedo()} />
        </div>
    );
};