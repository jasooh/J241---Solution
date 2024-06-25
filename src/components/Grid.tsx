import { useState, useRef, useEffect } from "react"

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

    // Grid Methods
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

    // Setting row and column sizes
    const gridStyle = {
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gridTemplateColumns: `repeat(${columns}, 1fr)`
    }

    // Reinitialize array when dimensions change
    useEffect(() => {
        setCellGrid(Array(rows*columns).fill(false));
    }, [rows, columns])


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

    // Status methods
    const getCellCount = (type: boolean) => {
        let count = 0;
        cellGrid.forEach(value => {
            if (type == value) {
                count++
            }
        })
        if (count >= rows*columns) {tick.pauseSimulation();}
        return count;
    }
    
    return (
        <>
            <div className="flex flex-col items-center w-[60%] h-[90%] gap-3 shadow-xl p-5">
                {/* Title & heading */}
                <div className="flex flex-col items-center">
                    <label className="font-bold">BACTERIA SIMULATION</label>
                    <label className="text-sm font-semibold text-gray-500">{rows}x{columns}</label>
                </div>

                {/* Grid rendering */}
                <div className="w-[70%] h-[80%] border rounded-sm border-black grid" style={gridStyle}>
                    {renderGrid(cellGrid)}
                </div>

                {/* Start stop buttons */}
                <div className="flex w-full h-[5rem] gap-2 justify-center">
                    <button className={`font-semibold rounded-md border p-2 hover:border-green-800 ${tick.isRunning.current ? 'border-green-800 text-green-800' : 'bg-white'} duration-200`} onClick={handleStartClick}>START</button>
                    <button className={`font-semibold rounded-md border p-2 ${!tick.isRunning.current ? 'border-yellow-800 text-yellow-800' : 'bg-white'} duration-200`} onClick={handlePauseClick}>PAUSE</button>
                    <button className="font-semibold rounded-md border p-2 hover:border-red-800 hover:text-red-800 duration-200" onClick={handleResetClick}>RESET</button>
                </div>

                {/* Time input */}
                <div className="flex flex-col items-center gap-3">
                    <label className="font-semibold">TIME INTERVAL (Seconds): </label>
                    <input className="border border-black rounded w-30 py-1 px-2 mt-[-10px] mb-5 text-center" type="number" step="0.01" autoFocus={true} value={tick.interval} onChange={handleIntervalChange}/>
                </div>
            </div>

            {/* Status tab */}
            <div className="flex flex-col gap-10 w-[20%] h-[50%] items-center shadow-xl p-10">
                <label className="font-bold">STATUS WINDOW</label>
                <div className="flex flex-col">
                    <label>Infected: {getCellCount(true)}</label>
                    <label>Normal: {getCellCount(false)} </label>
                    <label>Actions: {tick.tick}</label>
                </div>
            </div>
        </>
    )
}

export default Grid;