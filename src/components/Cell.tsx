import React, { Dispatch, SetStateAction, useEffect } from "react";

interface CellProps {
    id: number,
    position: number[],
    grid: boolean[],
    setGrid: Dispatch<SetStateAction<boolean[]>>,
    gridDimensions: number[]
}

const Cell = React.memo(({id, position, grid, setGrid, gridDimensions}:CellProps) => {
    const convertToIndex = (position: number[]): number => {
        const arrRows = gridDimensions[0];
        return (position[1]*arrRows)+position[0]
    }

    const isInBounds = (position: number[]): boolean => {
        const currentRow = position[0];
        const currentCol = position[1];

        const gridRows = gridDimensions[0]
        const gridCols = gridDimensions[1]

        if ((currentCol+1 > gridCols || currentCol < 0) || (currentRow+1 > gridRows || currentRow < 0)) {
            return false
        }
        return true
    }

    const infect = (id: number | number[]): void => {
        const indexToLookFor = typeof(id) === 'number' ? id : convertToIndex(id)
        setGrid(currentGrid => (
            currentGrid.map((value, index) => (index === indexToLookFor ? true : value))
        ));
    };

    const spread = (id: number | number[]) => {
        const dir = [
            [0,0],
            [1,0],
            [-1,0],
            [0,1],
            [0,-1]
        ]

        dir.forEach(currentDir => {
            const x = position[0] + currentDir[0];
            const y = position[1] + currentDir[1];

            if (isInBounds([x, y])) {
                infect([x, y]);
            }
        })
    }

    if (grid[id]) {
        return (
            <div className="border border-black bg-green-500" />
        )
    }
    return <div className="border border-black" onClick={() => spread(id)} />
}, (prevProps, nextProps) => {
    // check if props are equal and if the previous and next states are the same
    return prevProps.grid[prevProps.id] === nextProps.grid[nextProps.id];
});

export default Cell;
