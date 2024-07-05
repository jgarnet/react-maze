import {useCallback} from "react";
import {Maze, Point} from "@/types";

/**
 * Credit to https://github.com/oppenheimj/maze-generator for original algorithm.
 */
export const useMazeGenerator = () => {
    return useCallback((rows: number, cols: number) => {
        // initialize maze
        const maze: Maze = [];
        for (let i = 0; i < rows; i++) {
            maze[i] = [];
            for (let j = 0; j < cols; j++) {
                maze[i][j] = 1;
            }
        }
        // helper functions
        const isInBounds = (point: Point) => {
            return point.x >= 0 && point.x < cols && point.y >= 0 && point.y < rows;
        };
        const isSamePoint = (point: Point, x: number, y: number) => {
            return point.x === x && point.y === y;
        };
        const isNotCorner = (point: Point, x: number, y: number) => {
            return (x == point.x || y == point.y);
        };
        const isValidNextPoint = (point: Point) => {
            let neighborPathsCount = 0;
            for (let y = point.y - 1; y < point.y + 2; y++) {
                for (let x = point.x - 1; x < point.x + 2; x++) {
                    if (isInBounds({ x, y }) && !isSamePoint(point, x, y) && maze[y][x] === 0) {
                        neighborPathsCount++;
                    }
                }
            }
            return neighborPathsCount < 3 && maze[point.y][point.x] !== 0;
        };
        const addNeighborsToStack = (neighbors: Point[]) => {
            let targetIndex;
            while (neighbors.length > 0) {
                targetIndex = Math.floor(Math.random() * neighbors.length);
                const neighbor = neighbors[targetIndex];
                neighbors.splice(targetIndex, 1);
                stack.push(neighbor);
            }
        };
        const findNeighbors = (point: Point) => {
            const neighbors = [];
            for (let y = point.y - 1; y < point.y + 2; y++) {
                for (let x = point.x - 1; x < point.x + 2; x++) {
                    if (isInBounds({ x, y }) && !isSamePoint(point, x, y) && isNotCorner(point, x, y)) {
                        neighbors.push({ x, y });
                    }
                }
            }
            return neighbors;
        };
        // generate maze
        const stack: Point[] = [{ x: 0, y: 0 }];
        while (stack.length > 0) {
            const point = stack.pop() as Point;
            if (isValidNextPoint(point)) {
                maze[point.y][point.x] = 0;
                const neighbors = findNeighbors(point);
                addNeighborsToStack(neighbors);
            }
        }
        maze[0][0] = 2;
        maze[rows -1][cols -1] = 3;
        return maze;
    }, []);
};