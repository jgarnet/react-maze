import React, {useState} from 'react';
import {MazeContextProvider} from "@/context";
import {Maze, Point} from "@/types";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home, HomeButton, MazeEditor, MazeSolver} from "@/components";

export const App = () => {
	// initialize App state
	const [maze, setMaze] = useState<Maze>(null);
	const [cellSize, setCellSize] = useState<number>(25);
	const [start, setStart] = useState<Point>(null);
	const [end, setEnd] = useState<Point>(null);
	// provide global App state to all Components / Hooks
	return (
		<MazeContextProvider
			maze={maze}
			setMaze={setMaze}
			cellSize={cellSize}
			setCellSize={setCellSize}
			start={start}
			setStart={setStart}
			end={end}
			setEnd={setEnd}
		>
			<div className='col-container'>
				<BrowserRouter>
					<HomeButton />
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/editor' element={<MazeEditor />} />
						<Route path='/solver' element={<MazeSolver />} />
					</Routes>
				</BrowserRouter>
			</div>
		</MazeContextProvider>
	);
};
