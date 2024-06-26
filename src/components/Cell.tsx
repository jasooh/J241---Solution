// Cell component:
// A component responsible for rendering a single box (cell) in the array. Listens for updates on the tick context to know when to divide.

// Hooks & types
import React, { SetStateAction, useEffect, Dispatch } from "react";

// Context
import { useTickContext } from "../context/TickContext";

interface CellProps {
    id: number, // Index of cell in the state array
    position: number[], // [Row, Column] position of the cell, used for performing vector math and visualizing direction in state array
    grid: boolean[], // State array
    setGrid: Dispatch<SetStateAction<boolean[]>>, // Method to update the state array
    gridDimensions: number[], // Holds dimensions of state array
};

const Cell = React.memo(({id, position, grid, setGrid, gridDimensions}:CellProps) => {
    const tick = useTickContext();

    // Cell methods
    const convertToIndex = (position: number[]): number => { // Converts 2D coordinates given in an array into an index for the array that manages the state of the cells
        const arrRows = gridDimensions[0];
        return (position[1]*arrRows)+position[0]; // (current column * total rows in state array) + current row
    };

    const isInBounds = (position: number[]): boolean => { // Returns true or false based on if the passed position is within the grid boundaries
        const currentRow = position[0];
        const currentCol = position[1];
        // Retrieve grid dimensions
        const gridRows = gridDimensions[0];
        const gridCols = gridDimensions[1];

        if ((currentCol+1 > gridCols || currentCol < 0) || (currentRow+1 > gridRows || currentRow < 0)) {
            console.warn("Cell went out of bounds, not allowed to render - ID:", id)
            return false;
        };
        return true;
    };

    const infect = (cellId: number | number[], pos: number[]): void => { // Infects a healthy cell using its state array index or coordinates
        const indexToLookFor = typeof(cellId) === 'number' ? cellId : convertToIndex(cellId);
        if (isInBounds(pos) && grid[indexToLookFor] === false ) {
            setGrid(currentGrid => (
                currentGrid.map((value, index) => (index === indexToLookFor ? true : value))
            ));
        };
    };

    // useEffect listens for each tick update to infect nearby cells
    useEffect(() => {
        if (grid[id]) {
            const random1 = Math.floor(Math.random() * 4);
            const random2 = Math.floor(Math.random() * 4);

            const dir = [
                [1,0],
                [-1,0],
                [0,1],
                [0,-1]
            ];

            const x = position[0] + dir[random1][0]; // move one unit in a random x direction
            const y = position[1] + dir[random2][1]; // move one unit in a random y direction

            const randomDirection = [x, y];
            infect(convertToIndex([x, y]), randomDirection);
        };
    }, [tick.tick]);

    // Render green or black depending on state
    if (grid[id]) {
        return (
            <div className="border border-black bg-green-600" />
        );
    };
    return <div className="border border-black bg-white" onClick={() => infect(id, position)} />
    
}, (prevProps, nextProps) => {
    // If current props are equal to the next state props, then we do not need to re-render - cell has not been changed
    return prevProps.grid[prevProps.id] === nextProps.grid[nextProps.id];
});

export default Cell;
