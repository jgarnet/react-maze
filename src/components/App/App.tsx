import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {HomePage, MazeEditorPage, MazeSolverPage} from "@/pages";

export const App = () => {
	return (
		<div className='col-container'>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<HomePage />}/>
					<Route path='/editor' element={<MazeEditorPage />}/>
					<Route path='/solver' element={<MazeSolverPage />}/>
				</Routes>
			</BrowserRouter>
		</div>
	);
};
