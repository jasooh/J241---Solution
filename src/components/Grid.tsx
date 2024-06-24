import { useState, useRef } from "react"

// Components
import Cell from "./Cell";

// Context
import { useTickContext } from "../context/TickContext";

interface GridProps {
    rows: number,
    columns: number
}

const Grid = ({rows, columns}:GridProps) => {
    // Context
    const tick = useTickContext();
    // State variables
    const [cellGrid, setCellGrid] = useState(Array(rows*columns).fill(false)); // Populate the array

    const renderGrid = (cellGrid: boolean[]) => {
        let renderedComponents: JSX.Element[] = [];
        let currentPosition = [0, 0]
        for (let currentRow = 0; currentRow < rows; currentRow++) {
            for (let currentColumn = 0; currentColumn < columns; currentColumn++) {
                const currentKey = (currentColumn*rows)+currentRow
                currentPosition = [currentRow, currentColumn]
                renderedComponents.push(
                    <Cell key={currentKey} id={currentKey} position={currentPosition} grid={cellGrid} setGrid={setCellGrid} gridDimensions={[rows, columns]} />
                );
            }
        }

        return renderedComponents;
    }

    // Button logic
    const handleStartClick = () => {
        tick.startSimulation();
    }

    const handlePauseClick = () => {
        tick.pauseSimulation();
    }

    const handleResetClick = () => {
        tick.restartSimulation();
        setCellGrid(Array(rows*columns).fill(false));
    }

    const handleIntervalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const parsedValue = parseFloat(event.target.value)
        const value = isNaN(parsedValue) ? 1 : parsedValue 
        tick.changeSimulationInterval(value);
    }

    // Setting row and column sizes
    const gridStyle = {
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gridTemplateColumns: `repeat(${columns}, 1fr)`
    }

    return (
        <div className="flex flex-col items-center w-[35rem] h-[40rem] gap-2 mb-5">
            <div className="flex flex-col items-center">
                <label className="font-bold">BACTERIA SIMULATION</label>
                <label className="text-sm font-semibold text-gray-500 my-[-5px]">{rows}x{columns}</label>
            </div>
            <div className="w-full h-full border border-black grid" style={gridStyle}>
                {renderGrid(cellGrid)}
            </div>
            {/* Start stop buttons */}
            <div className="flex gap-5 justify-center">
                <button className="font-semibold hover:font-bold" onClick={handleStartClick}>START</button>
                <button className="font-semibold hover:font-bold" onClick={handlePauseClick}>PAUSE</button>
                <button className="font-semibold hover:font-bold" onClick={handleResetClick}>RESET</button>
            </div>
            {/* Time input */}
            <div className="flex flex-col items-center gap-3">
                <label className="font-semibold">TIME INTERVAL (Seconds): </label>
                <input className="border border-black rounded w-30 py-1 px-2 my-2 mb-5 text-center" type="number" step="0.01" value={tick.interval} onChange={handleIntervalChange}/>
            </div>
        </div>
    )
}

export default Grid;