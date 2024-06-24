import {MazeImporter, MazeViewer} from "@/components";
import {MazeSolverContextProvider, useMazeContext} from "@/context";

export const MazeSolver = () => {
    const { maze } = useMazeContext();
    if (!maze || maze.length === 0) {
        return <MazeImporter />;
    }
    return (
        <MazeSolverContextProvider>
            <MazeViewer />
        </MazeSolverContextProvider>
    );
};