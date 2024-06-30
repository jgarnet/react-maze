import React from 'react';
import {useMazeContext} from "@/context";
import {MazeRow, MazeSizeControl} from "@/components";
import "./MazeViewer.scss";

export const MazeViewer = () => {

    const { maze, cellSize, setMaze, setStart, setEnd } = useMazeContext();

    return (
        <div className='col-container'>
            <MazeSizeControl />
            <div className='maze'
                 style={{width: `${cellSize * maze[0].length}px`, height: `${cellSize * maze.length}px`}}>
                {maze.map((row, i) => <MazeRow key={`row-${i}`} row={i} cols={row}/>)}
            </div>
        </div>
    );
};