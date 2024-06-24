import React from 'react';
import {useMazeContext} from "@/context";

export const MazeSizeControl = () => {
    const { cellSize, setCellSize } = useMazeContext();
    return (
        <div className='maze-size-control'>
            <table>
                <tbody>
                    <tr>
                        <td>Cell Size</td>
                        <td>
                            <input
                                type='range'
                                value={cellSize}
                                min={10}
                                max={50}
                                onChange={e => setCellSize(e.target.value as number)}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};