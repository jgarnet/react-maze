import {useMazeEditorContext} from "@/context";

export const FillModeControl = () => {
    const { fillMode, setFillMode } = useMazeEditorContext();
    return (
        <table>
            <tbody>
                <tr>
                    <td>Fill Mode</td>
                    <td>
                        <select defaultValue={fillMode} onChange={e => setFillMode(e.target.value)}>
                            {['fill', 'remove', 'start', 'end'].map(mode => (
                                <option key={mode} value={mode}>{mode}</option>
                            ))}
                        </select>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};