import {FC} from "react";

type ToggleSolutionProps = {
    showSolution: boolean;
    toggleSolution: () => void;
};
export const ToggleSolution: FC<ToggleSolutionProps> = ({ showSolution, toggleSolution }) => {
    return (
        <input type='button' value={showSolution ? 'Hide Solution' : 'Show Solution'} onClick={toggleSolution} />
    );
};