import React, {FC, ReactNode} from 'react';
import {MazeContextProvider} from "@/context";
import {renderHook} from "@testing-library/react";
import {useSolveMaze} from "@/hooks/useSolveMaze/useSolveMaze";
import unsolvable from '@data/unsolvable.json';
import simple from '@data/simple.json';
import {Maze, Point} from "@/types";

const getWrapper: (maze: Maze, start?: Point, end?: Point) => FC<{ children: ReactNode }> = (maze, start, end) => {
    return ({ children }) => (
        <MazeContextProvider
            maze={maze}
            setMaze={() => {}}
            cellSize={0}
            setCellSize={() => {}}
            start={start}
            setStart={() => {}}
            end={end}
            setEnd={() => {}}
        >
            {children}
        </MazeContextProvider>
    );
};
describe('useSolveMaze tests', () => {
    it('should return null if no solution exists', () => {
        const result = renderHook(() => useSolveMaze(), {
            wrapper: getWrapper(unsolvable as Maze, { x: 1, y: 1 }, { x: 8, y: 8 })
        });
        const { result: { current } } = result;
        expect(current).toEqual(null);
    });
    it('should return null if start is not provided', () => {
        const result = renderHook(() => useSolveMaze(), {
            wrapper: getWrapper(simple as Maze)
        });
        const { result: { current } } = result;
        expect(current).toEqual(null);
    });
    it('should return null if end is not provided', () => {
        const result = renderHook(() => useSolveMaze(), {
            wrapper: getWrapper(simple as Maze, { x: 1, y: 1 })
        });
        const { result: { current } } = result;
        expect(current).toEqual(null);
    });
    it('should return null if Maze is empty', () => {
        const result = renderHook(() => useSolveMaze(), {
            wrapper: getWrapper([], { x: 1, y: 1 }, { x: 8, y: 8 })
        });
        const { result: { current } } = result;
        expect(current).toEqual(null);
    });
    it('should return correct solution using expected object structure', () => {
        const result = renderHook(() => useSolveMaze(), {
            wrapper: getWrapper(simple as Maze, { x: 1, y: 1 }, { x: 8, y: 8 })
        });
        const { result: { current } } = result;
        const expected = {
            x: 8,
            y: 8,
            prev: {
                x: 8,
                y: 7,
                prev: {
                    x: 8,
                    y: 6,
                    prev: {
                        x: 8,
                        y: 5,
                        prev: {
                            x: 8,
                            y: 4,
                            prev: {
                                x: 8,
                                y: 3,
                                prev: {
                                    x: 8,
                                    y: 2,
                                    prev: {
                                        x: 8,
                                        y: 1,
                                        prev: {
                                            x: 7,
                                            y: 1,
                                            prev: {
                                                x: 6,
                                                y: 1,
                                                prev: {
                                                    x: 5,
                                                    y: 1,
                                                    prev: {
                                                        x: 4,
                                                        y: 1,
                                                        prev: {
                                                            x: 3,
                                                            y: 1,
                                                            prev: {
                                                                x: 2,
                                                                y: 1,
                                                                prev: {
                                                                    x: 1,
                                                                    y: 1
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };
        expect(current).toEqual(expected);
    });
});