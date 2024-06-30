import {Maze, PathPoint, Point} from "@/types";
import {useMemo} from "react";

const DIRECTIONS: Point[] = [
    // down
    { x: 0, y: 1 },
    // up
    { x: 0, y: -1 },
    // right
    { x: 1, y: 0 },
    // left
    { x: -1, y: 0 }
];
export const useSolveMaze: (maze: Maze, start: Point, end: Point) => PathPoint | null = (maze, start, end) => {
    return useMemo(() => {
        if (!maze || maze.length === 0 || !start || !end) {
            return null;
        }
        // initialize queue for BFS algorithm
        const queue: PathPoint[] = [];
        // keep track of visited Points during BFS
        const visited: boolean[][] = [];
        // initialize visited[][] matrix, assigning false to all Points
        for (let i = 0; i < maze.length; i++) {
            visited[i] = [];
            for (let j = 0; j < maze[i].length; j++) {
                visited[i][j] = false;
            }
        }
        const isValidPoint = (point: Point) => {
            return (
                // ensure Point bounds are valid
                point.y >= 0 && point.y < maze.length &&
                point.x >= 0 && point.x < maze[point.y].length &&
                // ensure Point is not already visited
                !visited[point.y][point.x] &&
                // ensure Point is not a wall
                maze[point.y][point.x] !== 1
            );
        };
        // begin BFS algorithm
        queue.unshift(start as Point);
        while (queue.length > 0) {
            const currentPoint = queue.shift() as PathPoint;
            if (currentPoint.x === end.x && currentPoint.y === end.y) {
                return currentPoint;
            }
            for (const direction of DIRECTIONS) {
                const nextPoint = { x: currentPoint.x + direction.x, y: currentPoint.y + direction.y };
                if (isValidPoint(nextPoint)) {
                    visited[nextPoint.y][nextPoint.x] = true;
                    queue.unshift({ ...nextPoint, prev: currentPoint });
                }
            }
        }
        return null;
    }, [maze]);
};