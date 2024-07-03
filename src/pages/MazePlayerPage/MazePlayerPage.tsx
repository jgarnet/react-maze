import React from 'react';
import {MazeContextProvider} from "@/context";
import {useHasMaze, useMaze, useMazePlayer} from "@/hooks";
import {HomeButton, MazeImporter, MazeViewer, ToggleSolution} from "@/components";
import './MazePlayerPage.scss';

export const MazePlayerPage = () => {
    const mazeState = useMaze();
    const mazePlayerState = useMazePlayer(mazeState);
    const hasMaze = useHasMaze(mazeState.maze);
    return (
        <MazeContextProvider {...mazeState} {...mazePlayerState}>
            <HomeButton />
            {!hasMaze && (<MazeImporter />)}
            {hasMaze && (
                <>
                    <ToggleSolution {...mazePlayerState} />
                    <MazeViewer className='player' />
                </>
                )
            }
        </MazeContextProvider>
    );
};