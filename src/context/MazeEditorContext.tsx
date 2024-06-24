import React, {createContext, FC, ReactNode, useContext} from "react";
import {Col, FillMode, Point} from "@/types";

type MazeEditorContextValue = {
    setCol: (row: number, col: number, value: Col) => void;
    fillMode: FillMode;
    setFillMode: (fillMode: FillMode) => void;
    onFill: (row: number, col: number) => void;
    currentHoverPoint?: Point;
    setCurrentHoverPoint: (point: Point) => void;
    fillStartPoint?: Point;
};

const MazeEditorContext = createContext<MazeEditorContextValue | null>(null);

export const useMazeEditorContext = () => useContext(MazeEditorContext);

type MazeEditorContextProviderProps = {
    children: ReactNode;
} & MazeEditorContextValue;

export const MazeEditorContextProvider: FC<MazeEditorContextProviderProps> = props => {
    const { children, setCol, fillMode, setFillMode, onFill, currentHoverPoint, setCurrentHoverPoint, fillStartPoint } = props;
    return (
        <MazeEditorContext.Provider value={{ setCol, fillMode, setFillMode, onFill, currentHoverPoint, setCurrentHoverPoint, fillStartPoint }}>
            {children}
        </MazeEditorContext.Provider>
    );
};