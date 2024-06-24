import React from 'react';
import {useNavigate} from "react-router-dom";
import {useMazeContext} from "@/context";

export const HomeButton = () => {
    const { setMaze, setStart, setEnd } = useMazeContext();
    const navigate = useNavigate();
    const goHome = () => {
        setStart(null);
        setEnd(null);
        setMaze([]);
        navigate('/');
    };
    return (
        <input type='button' value='Home' onClick={goHome}/>
    );
};