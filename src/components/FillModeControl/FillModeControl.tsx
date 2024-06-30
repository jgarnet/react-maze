import {FillMode} from "@/types";
import {FC} from "react";

type FillModeControlProps = {
    fillMode: FillMode;
    setFillMode: (fillMode: FillMode) => void;
};

export const FillModeControl: FC<FillModeControlProps> = props => {
    const { fillMode, setFillMode } = props;
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