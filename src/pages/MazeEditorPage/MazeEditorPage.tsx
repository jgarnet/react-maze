import {useHasMaze, useMaze} from "@/hooks";
import {MazeContextProvider} from "@/context";
import {FillModeControl, HomeButton, MazeExporter, MazeImporter, MazeInitializer, MazeViewer} from "@/components";
import React from "react";
import {useSearchParams} from "react-router-dom";
import "./MazeEditorPage.scss";
import {useMazeEditor} from "@/hooks";

export const MazeEditorPage = () => {
    /* State Management Operations */
    const [searchParams] = useSearchParams();
    const mazeState = useMaze();
    const mazeEditorState = useMazeEditor(mazeState);
    const hasMaze = useHasMaze(mazeState.maze);
    /* Render Operations */
    const renderInitialize = () => {
        if (searchParams.get('import') === 'true') {
            return <MazeImporter />;
        } else {
            return <MazeInitializer />;
        }
    };
    return (
        <MazeContextProvider
            {...mazeState}
            {...mazeEditorState}
        >
            <div className='col-container maze-editor'>
                <HomeButton />
                {hasMaze && (
                    <>
                        <FillModeControl fillMode={mazeEditorState.fillMode} setFillMode={mazeEditorState.setFillMode} />
                        <MazeExporter/>
                        <MazeViewer className='editor' />
                    </>
                )}
                {!hasMaze && renderInitialize()}
            </div>
        </MazeContextProvider>
    );
};