import {useNavigate} from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate();
    return (
        <div className='row-container'>
            <input type='button' value='Build Maze' onClick={() => navigate('/editor')}/>
            <input type='button' value='Import and Edit Maze' onClick={() => navigate('/editor?import=true')}/>
            <input type='button' value='Import and Solve Maze' onClick={() => navigate('/solver')}/>
        </div>
    );
};