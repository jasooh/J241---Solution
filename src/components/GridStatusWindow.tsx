// GridStatusWindow component:
// A component responsible for containing the buttons related to the current state of the grid. Responsible for stopping the simulation when it fills up.

// Context type
import { TickProps } from "../context/TickContext";

interface GridStatusWindowProps {
    tick: TickProps,
    cellGrid: boolean[],
    rows: number,
    columns: number
};

const GridStatusWindow = ({tick, cellGrid, rows, columns}:GridStatusWindowProps) => {
    // Status methods
    const getCellCount = (type: boolean) => { // Get the total amount of infected (true) or healthy (false) cells
        let count = 0;
        cellGrid.forEach(value => {
            if (type === value) {
                count++;
            };
        });
        if (count >= rows*columns) {
            tick.pauseSimulation();
        };
        return count;
    };

    return (
        <div className="flex flex-col items-center justify-center gap-5 w-full max-w-[20rem] h-[20rem] shadow-xl p-10">
            <label className="font-bold">STATUS WINDOW</label>
            <div className="flex flex-col">
                <label>Infected: {getCellCount(true)}</label>
                <label>Normal: {getCellCount(false)} </label>
                <label>Generation: {tick.tick}</label>
            </div>
        </div>
    );
};

export default GridStatusWindow;