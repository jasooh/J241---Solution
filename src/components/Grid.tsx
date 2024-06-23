import { useState } from "react"

interface GridProps {
    rows: number,
    columns: number
}

const Grid = ({ rows, columns }:GridProps) => {
    // render the grid
    const createGrid = () => {
        let grid = [];
        for (let i = 0; i < rows*columns; i++) {
            grid.push(
                <div key={i} className="border border-black" />
            )
        }
        return grid;
    }

    const gridStyle = {
        gridTemplateRows: `repeat(${rows}, 3rem)`,
        gridTemplateColumns: `repeat(${columns}, 3rem)`
    }

    return (
        <div className="grid" style={gridStyle}>
            {createGrid()}
        </div>
    );
}

export default Grid;