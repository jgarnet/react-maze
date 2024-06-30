import {useHasMaze, useMaze, useSolveMaze} from "@/hooks";
import {PathPoint} from "@/types";
import {useEffect, useState} from "react";
import {MazeContextProvider} from "@/context";
import {HomeButton, MazeImporter, MazeViewer} from "@/components";
import "./MazeSolverPage.scss";

export const MazeSolverPage = () => {
    const mazeState = useMaze();
    const { maze, start, end } = mazeState;
    const hasMaze = useHasMaze(maze);
    const solution = useSolveMaze(maze, start, end);
    const [points, setPoints] = useState<Set<string>>(new Set<string>());
    const getCellClassName = (row: number, col: number) => {
        // if in solver mode, highlight the cell as a 'solution' cell
        if (points.has(`${col},${row}`)) {
            return ' solution';
        }
        return '';
    };
    useEffect(() => {
        if (solution) {
            let current: PathPoint | null = solution;
            while (current) {
                points.add(`${current.x},${current.y}`);
                current = (current as any).prev;
            }
            setPoints(new Set(points));
        }
    }, [solution]);
    return (
        <MazeContextProvider {...mazeState} getCellClassName={getCellClassName}>
            <HomeButton />
            {!hasMaze && (<MazeImporter />)}
            {hasMaze && (<MazeViewer />)}
        </MazeContextProvider>
    );
};