import React, {FC} from 'react';
import {useMazeContext} from "@/context";
import {useMazeGenerator} from "@/hooks";
import {Maze} from "@/types";

type GenerateMazeProps = {
    onGenerate?: (maze: Maze) => void;
};

export const GenerateMaze: FC<GenerateMazeProps> = props => {
    const { onGenerate } = props;
    const { maze, setMaze, setStart, setEnd } = useMazeContext();
    const generateMaze = useMazeGenerator();
    const onClick = () => {
        const _maze = generateMaze(maze.length, maze[0].length);
        setMaze(_maze);
        setStart({ x: 0, y: 0 });
        setEnd({ x: maze[0].length - 1, y: maze.length - 1 });
        if (onGenerate) {
            onGenerate(_maze);
        }
    };
    return (
        <input type='button' value='Generate Maze' onClick={onClick} />
    );
};