import {useState} from "react";
import {Maze} from "@/types";

export const useMazeHistory = (maxHistory = 10) => {
    const [mazeHistory, setMazeHistory] = useState<Maze[]>([]);
    const [currentHistory, setCurrentHistory] = useState<number>(0);
    const undo = () => {
        const nextHistory = Math.max(0, currentHistory - 1);
        setCurrentHistory(nextHistory);
        return JSON.parse(JSON.stringify(mazeHistory[nextHistory]));
    };
    const redo = () => {
        const nextHistory = Math.min(mazeHistory.length - 1, currentHistory + 1);
        setCurrentHistory(nextHistory);
        return JSON.parse(JSON.stringify(mazeHistory[nextHistory]));
    };
    const addHistory = (maze: Maze) => {
        const newHistory = mazeHistory.slice(0, currentHistory + 1);
        newHistory.push(JSON.parse(JSON.stringify(maze)));
        if (newHistory.length > maxHistory) {
            newHistory.shift();
        }
        setMazeHistory(newHistory);
        setCurrentHistory(newHistory.length - 1);
    };
    const canUndo = () => currentHistory > 0;
    const canRedo = () => currentHistory < mazeHistory.length - 1;
    return { undo, redo, addHistory, canUndo, canRedo };
};