import {useHasMaze, useMaze, useMazeEditor} from "@/hooks";
import {MazeContextProvider} from "@/context";
import {
    FillModeControl,
    GenerateMaze,
    HomeButton,
    MazeExporter,
    MazeHistory,
    MazeImporter,
    MazeInitializer,
    MazeViewer
} from "@/components";
import React from "react";
import {useSearchParams} from "react-router-dom";
import "./MazeEditorPage.scss";

export const MazeEditorPage = () => {
    /* State Management Operations */
    const [searchParams] = useSearchParams();
    const mazeState = useMaze();
    const mazeEditorState = useMazeEditor(mazeState);
    const hasMaze = useHasMaze(mazeState.maze);
    /* Render Operations */
    const renderInitialize = () => {
        if (searchParams.get('import') === 'true') {
            return <MazeImporter onImport={mazeEditorState.addHistory} />;
        } else {
            return <MazeInitializer onInitialize={mazeEditorState.addHistory} />;
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
                        <div className='row-container'>
                            <FillModeControl fillMode={mazeEditorState.fillMode} setFillMode={mazeEditorState.setFillMode} />
                            <GenerateMaze onGenerate={mazeEditorState.addHistory} />
                            <MazeExporter/>
                        </div>
                        <MazeHistory {...mazeEditorState} />
                        <MazeViewer className='editor' />
                    </>
                )}
                {!hasMaze && renderInitialize()}
            </div>
        </MazeContextProvider>
    );
};