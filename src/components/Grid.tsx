import { useState } from "react"

// Components
import Cell from "./Cell";

interface GridProps {
    rows: number,
    columns: number
}

const Grid = ({rows, columns}:GridProps) => {
    // Populate the array
    const [cellGrid, setCellGrid] = useState(Array(rows*columns).fill(false));
    // console.log(cellGrid)

    const renderGrid = (cellGrid: boolean[]) => {
        let renderedComponents: JSX.Element[] = [];
        let currentPosition = [0, 0]
        for (let currentRow = 0; currentRow < rows; currentRow++) {
            for (let currentColumn = 0; currentColumn < columns; currentColumn++) {
                const currentKey = (currentColumn*rows)+currentRow
                currentPosition = [currentRow, currentColumn]
                renderedComponents.push(
                    <Cell key={currentKey} id={currentKey} position={currentPosition} grid={cellGrid} setGrid={setCellGrid} gridDimensions={[rows, columns]}/>
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

    return (
        <div className="w-full h-full border border-black grid" style={gridStyle}>
            {renderGrid(cellGrid)}
        </div>
    )
}

export default Grid;