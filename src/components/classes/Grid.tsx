import React, { Component, ReactNode } from "react";

// Components
import Cell from "./Cell";

interface GridProps {
    rows: number,
    columns: number
};

interface GridState {
    grid: boolean[],
};

class Grid extends Component<GridProps, GridState> {
    constructor(props: GridProps) {
        super(props);
        this.state = {
            grid: Array(Number(this.props.rows)*Number(this.props.columns)).fill(false)
        }
    }

    createGrid = () => {
        // Initialize grid to hold components that will be rendered
        let tempGrid: JSX.Element[] = [];
        const rows = this.props.rows;
        const columns = this.props.columns;
        // Fill the entries of the array with the cell class components
        let currentPosition = [0, 0]
        for (let currentRow = 0; currentRow < rows; currentRow++) {
            for (let currentColumn = 0; currentColumn < columns; currentColumn++) {
                const currentKey = (currentColumn*this.props.rows)+currentRow
                currentPosition = [currentRow, currentColumn]
                tempGrid.push(
                    <Cell key={currentKey} id={currentKey} position={currentPosition} array={this}/>
                );
            };
        };

        return tempGrid;
    };

    changeCell = (index: number) => {
        this.setState(prevState => {
            return {
                grid: prevState.grid.map((cell, mapIndex) => ((mapIndex === index) ? true : cell))
            }
        })
    }

    getGrid = () => (this.state.grid);

    render() {
        // Setting row and column sizes
        const gridStyle = {
            gridTemplateRows: `repeat(${this.props.rows}, 1fr)`,
            gridTemplateColumns: `repeat(${this.props.columns}, 1fr)`
        }

        return (
            <>
                <div className="w-full h-full border border-black grid" style={gridStyle}>
                    {this.createGrid()}
                </div>
            </>
        )
    };
};

export default Grid