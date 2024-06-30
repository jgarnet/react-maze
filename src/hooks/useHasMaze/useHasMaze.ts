import {Maze} from "@/types";
import {useEffect, useState} from "react";

export const useHasMaze: (maze: Maze) => boolean = maze => {
    const [hasMaze, setHasMaze] = useState<boolean>(maze && maze.length > 0);
    useEffect(() => {
        setHasMaze(maze && maze.length > 0)
    }, [maze]);
    return hasMaze;
};