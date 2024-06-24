import {useMazeContext} from "@/context";

export const MazeExporter = () => {
    const { maze } = useMazeContext();
    const exportMaze = () => {
        const a = document.createElement('a');
        a.href = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(maze))
        a.target = '_blank';
        a.download = 'maze.json';
        a.click();
    };
    return (
        <input type='button' value='Export Maze' onClick={exportMaze} />
    );
};