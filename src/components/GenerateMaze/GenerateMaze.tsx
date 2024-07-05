import React, {FC} from 'react';
import {useMazeContext} from "@/context";
import {useMazeGenerator} from "@/hooks";
import {Maze} from "@/types";

type GenerateMazeProps = {
    onGenerate?: (maze: Maze) => void;
};

export const GenerateMaze: FC<GenerateMazeProps> = props => {
    const { onGenerate } = props;
    const { maze, setMaze } = useMazeContext();
    const generateMaze = useMazeGenerator();
    const onClick = () => {
        const _maze = generateMaze(maze.length, maze[0].length);
        setMaze(_maze);
        if (onGenerate) {
            onGenerate(_maze);
        }
    };
    return (
        <input type='button' value='Generate Maze' onClick={onClick} />
    );
};