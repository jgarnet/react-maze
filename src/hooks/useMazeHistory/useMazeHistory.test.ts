import {act, renderHook} from "@testing-library/react";
import {useMazeHistory} from "@/hooks";
import {Maze} from "@/types";

describe('useMazeHistory tests', () => {
    it('should not allow undo when there is no previous history', () => {
        const result = renderHook(() => useMazeHistory());
        const { result: history } = result;
        expect(history.current.canUndo()).toEqual(false);
        act(() => history.current.addHistory([]));
        act(() => history.current.addHistory([]));
        act(() => history.current.undo());
        expect(history.current.canUndo()).toEqual(false);
    });
    it('should allow undo when there is previous history', () => {
        const result = renderHook(() => useMazeHistory());
        const { result: history } = result;
        act(() => history.current.addHistory([]));
        act(() => history.current.addHistory([]));
        expect(history.current.canUndo()).toEqual(true);
    });
    it('should not allow redo when there is no future history', () => {
        const result = renderHook(() => useMazeHistory());
        const { result: history } = result;
        expect(history.current.canRedo()).toEqual(false);
        act(() => history.current.addHistory([]));
        act(() => history.current.addHistory([]));
        act(() => history.current.undo());
        expect(history.current.canRedo()).toEqual(true);
    });
    it('should return expected state on undo and redo', () => {
        const result = renderHook(() => useMazeHistory());
        const { result: history } = result;
        const expectedStates: Maze[] = [
            [[0,0,0,0,0]],
            [[1,0,0,0,0]],
            [[1,1,0,0,0]],
            [[1,1,1,0,0]],
            [[1,1,1,1,0]],
            [[1,1,1,1,1]]
        ];
        for (let i = 0; i < expectedStates.length; i++) {
            act(() => history.current.addHistory(expectedStates[i]));
        }
        let currentMaze: Maze = [];
        for (let i = expectedStates.length - 2; i >= 0; i--) {
            act(() => {
                currentMaze = history.current.undo();
            });
            expect(currentMaze).toEqual(expectedStates[i]);
        }
        for (let i = 1; i < expectedStates.length; i++) {
            act(() => {
                currentMaze = history.current.redo();
            });
            expect(currentMaze).toEqual(expectedStates[i]);
        }
    });
    it('should clear future history when changes are added', () => {
        const result = renderHook(() => useMazeHistory());
        const { result: history } = result;
        const expectedStates: Maze[] = [
            [[0,0,0,0,0]],
            [[1,0,0,0,0]],
            [[1,1,0,0,0]],
            [[1,1,1,0,0]],
            [[1,1,1,1,0]],
            [[1,1,1,1,1]]
        ];
        for (let i = 0; i < expectedStates.length; i++) {
            act(() => history.current.addHistory(expectedStates[i]));
        }
        let currentMaze: Maze = [];
        act(() => {
            currentMaze = history.current.undo();
        });
        act(() => {
            currentMaze = history.current.undo();
        });
        act(() => {
            currentMaze = history.current.undo();
        });
        act(() => history.current.addHistory([[1,1,0,0,1]]));
        expect(history.current.canRedo()).toEqual(false);
        act(() => history.current.addHistory([[1,1,0,1,1]]));
        act(() => {
            currentMaze = history.current.undo();
        });
        expect(currentMaze).toEqual([[1,1,0,0,1]]);
        act(() => {
            currentMaze = history.current.undo();
        });
        expect(currentMaze).toEqual([[1,1,0,0,0]]);
        act(() => {
            currentMaze = history.current.undo();
        });
        expect(currentMaze).toEqual([[1,0,0,0,0]]);
    });
    it('should allow 9 undo operations by default', () => {
        const result = renderHook(() => useMazeHistory());
        const { result: history } = result;
        for (let i = 0; i < 10; i++) {
            act(() => history.current.addHistory([]));
        }
        let undoCount = 0;
        while (history.current.canUndo()) {
            act(() => history.current.undo());
            undoCount++;
        }
        expect(undoCount).toEqual(9);
    });
    it('should limit history to max undo operations', () => {
        const result = renderHook(() => useMazeHistory(4));
        const { result: history } = result;
        for (let i = 0; i < 10; i++) {
            act(() => history.current.addHistory([]));
        }
        let undoCount = 0;
        while (history.current.canUndo()) {
            act(() => history.current.undo());
            undoCount++;
        }
        expect(undoCount).toEqual(3);
    });
});