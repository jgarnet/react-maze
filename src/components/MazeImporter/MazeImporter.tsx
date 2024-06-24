import {useMazeContext} from "@/context";

export const MazeImporter = () => {
    const { setMaze, setStart, setEnd } = useMazeContext();
    const onImport = e => {
        const file = (e.target as any).files[0];
        const fileReader = new FileReader();
        fileReader.readAsText(file,'UTF-8');
        fileReader.onload = readerEvent => {
            const mazeString = readerEvent.target.result;
            const maze = JSON.parse(mazeString as string);
            let start, end;
            // loop through maze cells and find the start / end cells
            for (let row = 0; row < maze.length; row++) {
                for (let col = 0; col < maze[row].length; col++) {
                    if (maze[row][col] === 2) {
                        start = { x: col, y: row };
                    } else if (maze[row][col] === 3) {
                        end = { x: col, y: row };
                    }
                    if (start && end) {
                        break;
                    }
                }
                if (start && end) {
                    break;
                }
            }
            setMaze(maze);
            setStart(start);
            setEnd(end);
        };
    };
    return (
        <div className='row-container'>
            <p>Select a file to import a Maze.</p>
            <input type='file' onChange={onImport} />
        </div>
    );
};