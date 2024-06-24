import React, { Component, ReactNode } from 'react';
import Grid from './Grid';

interface CellProps {
    id: number,
    position: number[],
    array: Grid
};

interface CellState {
    row: number,
    column: number,
    shouldRender: boolean
};

class Cell extends Component<CellProps, CellState> {
    constructor(props: CellProps) {
        super(props);
        this.state = {
            row: Number(this.props.position[0]),
            column: Number(this.props.position[1]),
            shouldRender: true
        }
    }

    shouldComponentUpdate(nextProps: Readonly<CellProps>, nextState: Readonly<CellState>): boolean {
        return true
    }

    getCellIndex = (): number => {
        const cell = this.state
        const arrRows = this.props.array.props.rows;

        return (cell.column*arrRows)+(cell.row)
    }

    convertToIndex = (position: number[]): number => {
        const grid = this.props.array;
        const arrRows = grid.props.rows;
        return (position[1]*arrRows)+position[0]
    }

    infect = (): void => {
        const grid = this.props.array
        let currentRow = this.props.position[0];
        let currentCol = this.props.position[1];

        const dir = [
            [1,0],
            [-1,0],
            [0,1],
            [0,-1]
        ]

        let newIndex = this.convertToIndex([currentRow, currentCol]);
        const repeat = setInterval(() => {
            dir.forEach(([delta_row, delta_col]) => {
                grid.changeCell(newIndex);
                const newRow = currentRow + delta_row;
                const newCol = currentCol + delta_col;
                currentRow = newRow;
                currentCol = newCol

                newIndex = this.convertToIndex([newRow, newCol]);

                if (!(this.isInBounds([newRow, newCol]))) {
                    clearInterval(repeat);
                } 
            })}, 300
        );
        // do not render infected cells
        this.setState({shouldRender: false});
    }

    isInfected = (): boolean => {
        const grid = this.props.array.getGrid();
        const cellIndex = this.getCellIndex();
        return grid[cellIndex];
    }

    isInBounds = (position: number[]): boolean => {
        const currentRow = position[0];
        const currentCol = position[1];

        const grid = this.props.array
        const gridRows = grid.props.rows
        const gridCols = grid.props.columns

        if ((currentCol+1 > gridCols-1 || currentCol-1 < 0) || (currentRow+1 > gridRows-1 || currentRow-1 < 0)) {
            return false
        }
        return true
    }

    render() {
        const cellIndex = this.getCellIndex();
        const grid = this.props.array.getGrid();
        const currentState = grid[cellIndex];

        if (currentState) {
            return (
                <div className="border border-black bg-green-500" />
            )
        } 
        return (
            <div className="border border-black" onClick={this.infect} />
        )
    }
}

export default Cell;