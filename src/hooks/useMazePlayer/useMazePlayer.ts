import {MazeState} from "@/types/MazeState";
import {useCallback, useEffect, useState} from "react";
import {Point} from "@/types";
import {Directions} from "@/constants/Directions";
import {useMazeSolver} from "@/hooks";

export const useMazePlayer = (mazeState: MazeState) => {
    const [playerPoint, setPlayerPoint] = useState<Point | null>(mazeState.start);
    const [showSolution, setShowSolution] = useState<boolean>(false);
    const toggleSolution = () => setShowSolution(!showSolution);
    const solutionPoints = useMazeSolver(mazeState.maze, playerPoint, mazeState.end);
    const getCellClassName = useCallback((row: number, col: number) => {
        const { end } = mazeState;
        if (row === playerPoint?.y && col === playerPoint?.x) {
            return ' player';
        }
        if (row === end?.y && col === end?.x) {
            return ' end';
        }
        if (showSolution && solutionPoints.has(`${col},${row}`)) {
            return ' solution';
        }
        return '';
    }, [playerPoint, showSolution]);
    const isValidPoint = (point: Point) => {
        const { maze } = mazeState;
        return (
            point.y >= 0 && point.y < maze.length &&
            point.x >= 0 && point.x < maze[0].length &&
            maze[point.y][point.x] !== 1
        );
    };
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        const direction = Directions.get(e.code);
        if (direction && playerPoint) {
            const nextPoint = { x: playerPoint.x + direction.x, y: playerPoint.y + direction.y };
            if (isValidPoint(nextPoint)) {
                setPlayerPoint(nextPoint);
            }
        }
    }, [playerPoint]);
    useEffect(() => {
        setPlayerPoint(mazeState.start);
    }, [mazeState.start]);
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);
    return {
        getCellClassName,
        showSolution,
        toggleSolution
    };
};