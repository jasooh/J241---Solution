// Cell component:
// A component responsible for rendering a single box (cell) in the array.

// Hooks & types
import React, { SetStateAction, Dispatch } from "react";

interface CellProps {
    id: number, // Index of cell in the state array
    grid: boolean[], // State array
    setGrid: Dispatch<SetStateAction<boolean[]>>, // Method to update the state array
};

const Cell = React.memo(({id, grid, setGrid}:CellProps) => {
    // Cell methods
    const infectCellOnClick = (): void => { // Infects a cell that has been clicked
        setGrid(currentGrid => (
            currentGrid.map((value, index) => (index === id ? true : value))
        ));
    };

    // Render green or black depending on state
    return <div className={`border border-black ${grid[id] ? 'bg-green-600' : 'bg-white'} duration-200`} onClick={infectCellOnClick} />    
}, (prevProps, nextProps) => {
    // If current props are equal to the next state props, then we do not need to re-render - cell has not been changed
    return prevProps.grid[prevProps.id] === nextProps.grid[nextProps.id];
});

export default Cell;
