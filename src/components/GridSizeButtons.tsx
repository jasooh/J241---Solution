// GridSizeButtons component: 
// A component that holds all the input tags that change the dimensions of the array on one section of the screen.

// Types
import { Dispatch, SetStateAction } from "react";

interface GridSizeProps {
    rows: number,
    columns: number,
    setRows: Dispatch<SetStateAction<number>>,
    setColumns: Dispatch<SetStateAction<number>>
};

// Set limits on inputs for the array
const max = 200

const handleChange = (event: React.ChangeEvent<HTMLInputElement>, setVariable: Dispatch<SetStateAction<number>>) => {
    const parsedValue = parseInt(event.target.value);
    const clamp = Math.max(1, Math.min(max, parsedValue)); // clamp the values between 1 and 100
    isNaN(parsedValue) ? setVariable(1) : setVariable(clamp);
};

const GridSizeButtons = ({rows, columns, setRows, setColumns}:GridSizeProps) => {
    return (
        <div className="flex flex-col items-center justify-center gap-5 w-full max-w-[20rem] h-[20rem] shadow-xl p-10">
            <label className="font-bold">GRID SIZE</label>
            <div className="flex flex-col items-center">
                <label>Rows</label>
                <input className="rounded w-16 py-1 px-2 mb-5 text-center shadow" type="number" step="1" value={rows} onChange={(event) => handleChange(event, setRows)} />
                <label>Columns</label>
                <input className="rounded w-16 py-1 px-2 mb-5 text-center shadow" type="number" step="1" value={columns} onChange={(event) => handleChange(event, setColumns)} />
            </div>
      </div>
    );
};

export default GridSizeButtons;