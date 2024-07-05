import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";
import {useMazeContext} from "@/context";
import {Maze} from "@/types";

type MazeInitializerProps = {
    onInitialize?: (maze: Maze) => void;
};

export const MazeInitializer: FC<MazeInitializerProps> = props => {
    const { onInitialize } = props;
    const { setMaze } = useMazeContext();
    const [rows, setRows] = useState<number>(25);
    const [cols, setCols] = useState<number>(25);
    const initializeMaze = () => {
        const maze = [];
        for (let i = 0; i < Math.min(rows, 50); i++) {
            maze[i] = [];
            for (let j = 0; j < Math.min(cols, 50); j++) {
                maze[i][j] = 0;
            }
        }
        setMaze(maze);
        if (onInitialize) {
            onInitialize(maze);
        }
    };
    const handleChange = (e: ChangeEvent<HTMLInputElement>, setter: (val: number) => void) => {
        setter(Math.min(e.target.value, 50));
    };
    const onKeyDown = (e: KeyboardEvent) => {
        if (e.code === 'Enter') {
            initializeMaze();
        }
    };
    return (
        <div className='row-container'>
            <table>
                <tbody>
                <tr>
                    <td>Rows</td>
                    <td>
                        <input
                            type='number'
                            value={rows}
                            max={50}
                            onChange={e => handleChange(e, setRows)}
                        />
                    </td>
                </tr>
                <tr>
                    <td>Columns</td>
                    <td>
                        <input
                            type='number'
                            value={cols}
                            max={50}
                            onChange={e => handleChange(e, setCols)}
                            onKeyDown={onKeyDown}
                        />
                    </td>
                </tr>
                <tr>
                    <td colSpan={2} style={{ textAlign: 'center' }}>
                        <input type='button' value='Build Maze' onClick={initializeMaze} />
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};