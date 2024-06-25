interface GridStatusWindowProps {
    actionCount: number,
    getCellCount: (param: boolean) => number
}

const GridStatusWindow = ({actionCount, getCellCount}:GridStatusWindowProps) => {
    return (
        <div className="flex flex-col gap-10 w-[10%] h-[30%] items-center justify-center shadow-xl">
            <label className="font-bold">STATUS WINDOW</label>
            <div className="flex flex-col">
                <label>Infected: {getCellCount(true)}</label>
                <label>Normal: {getCellCount(false)} </label>
                <label>Actions: {actionCount}</label>
            </div>
        </div>
    )
}

export default GridStatusWindow