// Grid component:
// A component responsible for holding the rendered grid and components related to it (GridSizeButtons, GridStatusWindows, & Cell).
// Creates the array that manages the state of all the cells within the rendered grid.
// Listens for updates on the tick context to know when to divide.

// Hooks
import React, { useState, useEffect } from "react";

// Components
import Cell from "./Cell";
import GridSizeButtons from "./GridSizeButtons";
import GridStatusWindow from "./GridStatusWindow";

// Context
import { useTickContext } from "../context/TickContext";

const Grid = () => {
    const tick = useTickContext();

    // State variables
    const [rows, setRows] = useState<number>(10);
    const [columns, setColumns] = useState<number>(10);
    const [cellGrid, setCellGrid] = useState<boolean[]>(Array(rows*columns).fill(false)); // Populate the array, this is the centralized array to manage the state of all cells

    // Grid methods & styling
    const renderGrid = (cellGrid: boolean[]) => { // Returns an array of JSX.Elements of <Cell>
        let renderedComponents: JSX.Element[] = [];
        let currentPosition = [0, 0];
        for (let currentRow = 0; currentRow < rows; currentRow++) {
            for (let currentColumn = 0; currentColumn < columns; currentColumn++) {
                const currentKey = (currentColumn*rows)+currentRow;
                currentPosition = [currentRow, currentColumn];
                renderedComponents.push(
                    <Cell key={currentKey} id={currentKey} grid={cellGrid} setGrid={setCellGrid} />
                );
            }
        }

        return renderedComponents;
    };

    const convertToIndex = (position: number[]): number => { // Converts 2D coordinates given in an array into an index for the array that manages the state of the cells
        return (position[1]*rows)+position[0]; // (current column * total rows in state array) + current row
    };

    const isInBounds = (position: number[]): boolean => { // Returns true or false based on if the passed position is within the grid boundaries
        const currentRow = position[0];
        const currentCol = position[1];

        if ((currentCol+1 > columns || currentCol < 0) || (currentRow+1 > rows || currentRow < 0)) {
            // console.warn("Cell went out of bounds, not allowed to render - ID:", convertToIndex([currentRow, currentCol]));
            return false;
        };
        return true;
    };

    const changeGrid = (cellId: number | number[], pos: number[]): void => { // Infects a healthy cell using its state array index or coordinates
        const indexToLookFor = typeof(cellId) === 'number' ? cellId : convertToIndex(cellId);
        if (isInBounds(pos) && cellGrid[indexToLookFor] === false ) {
            setCellGrid(currentGrid => (
                currentGrid.map((value, index) => (index === indexToLookFor ? true : value))
            ));
        };
    };

    const clearGrid = () => { // Sets all values to false, only to be used when dimensions are unchanged and we don't want a re-render
        setCellGrid(currentGrid => (currentGrid.map(value => value == true ? false : value)));
    };

    const gridStyle = { // CSS styling for grid wrapper
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gridTemplateColumns: `repeat(${columns}, 1fr)`
    };

    useEffect(() => { // Reinitialize array when dimensions change
        setCellGrid(Array(rows*columns).fill(false));
    }, [rows, columns]);

    useEffect(() => { // Listen for changes in tick to update the grid and cells that are infected, this simulates our bacteria
        cellGrid.forEach((value, index) => {
            if (value) {
                const random1 = Math.floor(Math.random() * 4);
                const random2 = Math.floor(Math.random() * 4);

                // Convert index back to positional data
                const currentRow = index%rows;
                const currentColumn = Math.floor(index / rows)

                const dir = [
                    [1,0],
                    [-1,0],
                    [0,1],
                    [0,-1]
                ];

                const x = currentRow + dir[random1][0]; // move one unit in a random x direction
                const y = currentColumn + dir[random2][1]; // move one unit in a random y direction

                const randomDirection = [x, y];
                changeGrid(convertToIndex([x, y]), randomDirection);
            }
        })
    }, [tick.tick]);

    // Button logic
    const handleStartClick = () => {
        tick.startSimulation();
    };

    const handlePauseClick = () => {
        tick.pauseSimulation();
    };

    const handleResetClick = () => {
        tick.restartSimulation();
        clearGrid();
    };

    const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => { // Pressing enter after setting an interval value starts the simulation
        if (event.key === "Enter") tick.startSimulation();
    };

    const handleIntervalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const parsedValue = parseFloat(event.target.value);
        const clamp = Math.max(0, Math.min(100, parsedValue)); // clamp the values between 1 and 100
        isNaN(parsedValue) ? tick.changeSimulationInterval(1) : tick.changeSimulationInterval(clamp);
    };
    
    return (
        <>
            {/* Resize tab */}
            <GridSizeButtons rows={rows} columns={columns} setRows={setRows} setColumns={setColumns} />

            {/* Grid container */}
            <div className="flex flex-col items-center w-full max-w-[40rem] h-[40rem] shadow-xl gap-3 p-5">
                {/* Title & heading */}
                <div className="flex flex-col items-center">
                    <label className="font-bold">BACTERIA SIMULATION</label>
                    <label className="text-sm font-semibold text-gray-500">{rows}x{columns}</label>
                </div>

                {/* Grid rendering */}
                <div className="w-full h-full border rounded-sm border-black grid" style={gridStyle}>
                    {renderGrid(cellGrid)}
                </div>

                {/* Start stop buttons */}
                <div className="flex w-full h-[5rem] gap-2 justify-center">
                    <button className={`font-semibold rounded-md border p-2 hover:border-green-800 ${tick.isRunning.current ? 'border-green-800 text-green-800' : 'bg-white'} duration-200`} onClick={handleStartClick}>START</button>
                    <button className={`font-semibold rounded-md border p-2 hover:border-yellow-800 ${!tick.isRunning.current ? 'border-yellow-800 text-yellow-800' : 'bg-white'} duration-200`} onClick={handlePauseClick}>PAUSE</button>
                    <button className="font-semibold rounded-md border p-2 hover:border-red-800 hover:text-red-800 duration-200" onClick={handleResetClick}>RESET</button>
                </div>

                {/* Time input */}
                <div className="flex flex-col items-center gap-3">
                    <label htmlFor="interval" className="font-semibold">TIME INTERVAL (Seconds): </label>
                    <input id="interval" className="border border-black rounded w-30 py-1 px-2 mt-[-10px] mb-5 text-center" type="number" step="0.01" autoFocus={true} value={tick.interval} onChange={handleIntervalChange} onKeyDown={(event) => handleOnKeyDown(event)}/>
                </div>
            </div>

            {/* Status tab */}
            <GridStatusWindow tick={tick} cellGrid={cellGrid} rows={rows} columns={columns} />
        </>
    );
};

export default Grid;