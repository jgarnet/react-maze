import React, {useState} from "react";
import {useMazeContext} from "@/context";

export const MazeInitializer = () => {
    const { setMaze } = useMazeContext();
    const [rows, setRows] = useState<number>(25);
    const [cols, setCols] = useState<number>(25);

    const initializeMaze = () => {
        const maze = [];
        for (let i = 0; i < rows; i++) {
            maze[i] = [];
            for (let j = 0; j < cols; j++) {
                maze[i][j] = 0;
            }
        }
        setMaze(maze);
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
                            onChange={e => setRows(e.target.value as number)}
                        />
                    </td>
                </tr>
                <tr>
                    <td>Columns</td>
                    <td>
                        <input
                            type='number'
                            value={cols}
                            onChange={e => setCols(e.target.value as number)}
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