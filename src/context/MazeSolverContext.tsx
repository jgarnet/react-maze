import React, {createContext, FC, ReactNode, useContext} from "react";
import {PathPoint} from "@/types";
import {useSolveMaze} from "@/hooks";

type MazeSolverContextValue = {
    points: Set<string>;
};

const MazeSolverContext = createContext<MazeSolverContextValue | null>(null);

export const useMazeSolverContext = () => useContext(MazeSolverContext);

type MazeSolverContextProps = {
    children: ReactNode;
};
export const MazeSolverContextProvider: FC<MazeSolverContextProps> = ({ children }) => {
    const solution = useSolveMaze();
    const points = new Set<string>();
    if (solution) {
        let current: PathPoint | null = solution;
        while (current) {
            points.add(`${current.x},${current.y}`);
            current = (current as any).prev;
        }
    }
    return (
        <MazeSolverContext.Provider value={{ points }}>
            {children}
        </MazeSolverContext.Provider>
    );
};