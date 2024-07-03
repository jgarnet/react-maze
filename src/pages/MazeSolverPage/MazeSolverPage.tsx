import {useHasMaze, useMaze, useMazeSolver} from "@/hooks";
import {MazeContextProvider} from "@/context";
import {HomeButton, MazeImporter, MazeViewer} from "@/components";
import "./MazeSolverPage.scss";

export const MazeSolverPage = () => {
    const mazeState = useMaze();
    const { maze, start, end } = mazeState;
    const hasMaze = useHasMaze(maze);
    const points = useMazeSolver(maze, start, end);
    const getCellClassName = (row: number, col: number) => {
        // if in solver mode, highlight the cell as a 'solution' cell
        if (points.has(`${col},${row}`)) {
            return ' solution';
        }
        return '';
    };
    return (
        <MazeContextProvider {...mazeState} getCellClassName={getCellClassName}>
            <HomeButton />
            {!hasMaze && (<MazeImporter />)}
            {hasMaze && (<MazeViewer className='solver' />)}
        </MazeContextProvider>
    );
};