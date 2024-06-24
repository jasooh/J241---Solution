import React, { Dispatch, SetStateAction, useEffect, useState, useRef } from "react";

// Context
import { useTickContext } from "../context/TickContext";

interface CellProps {
    id: number,
    position: number[],
    grid: boolean[],
    setGrid: Dispatch<SetStateAction<boolean[]>>,
    gridDimensions: number[],
}

const Cell = React.memo(({id, position, grid, setGrid, gridDimensions}:CellProps) => {
    // Context
    const tick = useTickContext();

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

    const infect = (id: number | number[], pos: number[]): void => {
        const indexToLookFor = typeof(id) === 'number' ? id : convertToIndex(id)
        if (isInBounds(pos) && !grid[indexToLookFor] ) {
            setGrid(currentGrid => (
                currentGrid.map((value, index) => (index === indexToLookFor ? true : value))
            ));
        }
    };

    // multiplying
    useEffect(() => {
        if (grid[id]) {
            const random1 = Math.floor(Math.random() * 4)
            const random2 = Math.floor(Math.random() * 4)

            const dir = [
                [1,0],
                [-1,0],
                [0,1],
                [0,-1]
            ]

            const x = position[0] + dir[random1][0]
            const y = position[1] + dir[random2][1]

            const randomDirection = [x, y]
            infect(convertToIndex([x, y]), randomDirection)
        }
    }, [tick.tick])

    if (grid[id]) {
        return (
            <div className="border border-black bg-green-500" />
        )
    }
    return <div className="border border-black" onClick={() => infect(id, position)} />
}, (prevProps, nextProps) => {
    // check if props are equal and if the previous and next states are the same
    return prevProps.grid[prevProps.id] === nextProps.grid[nextProps.id];
});

export default Cell;
