import {renderHook} from "@testing-library/react";
import {useMazeSolver} from "@/hooks";
import unsolvable from '@data/unsolvable.json';
import simple from '@data/simple.json';
import {Maze} from "@/types";

describe('useMazeSolver tests', () => {
    it('should return empty Set if no solution exists', () => {
        const result = renderHook(() => useMazeSolver(
            unsolvable as Maze,
            { x: 1, y: 1 },
            { x: 8, y: 8 })
        );
        const { result: { current } } = result;
        expect(current).toEqual(new Set());
    });
    it('should return empty Set if start is not provided', () => {
        const result = renderHook(() => useMazeSolver(
            simple as Maze,
            null,
            null
        ));
        const { result: { current } } = result;
        expect(current).toEqual(new Set());
    });
    it('should return empty Set if end is not provided', () => {
        const result = renderHook(() => useMazeSolver(
            simple as Maze,
            { x: 1, y: 1 },
            null
        ));
        const { result: { current } } = result;
        expect(current).toEqual(new Set());
    });
    it('should return empty Set if Maze is empty', () => {
        const result = renderHook(() => useMazeSolver(
            [],
            { x: 1, y: 1 },
            { x: 8, y: 8 }
        ));
        const { result: { current } } = result;
        expect(current).toEqual(new Set());
    });
    it('should return correct solution using expected object structure', () => {
        const result = renderHook(() => useMazeSolver(
            simple as Maze,
            { x: 1, y: 1 },
            { x: 8, y: 8 }
        ));
        const { result: { current } } = result;
        const expected = new Set([
            '8,8', '8,7', '8,6', '8,5', '8,4', '8,3', '8,2', '8,1',
            '7,1', '6,1', '5,1', '4,1', '3,1', '2,1', '1,1'
        ]);
        expect(current).toEqual(expected);
    });
});