interface GridStatusWindowProps {
    actionCount: number,
    getCellCount: (param: boolean) => number
}

const GridStatusWindow = ({actionCount, getCellCount}:GridStatusWindowProps) => {
    return (
        <div className="flex flex-col items-center justify-center gap-5 w-full max-w-[20rem] h-[20rem] shadow-xl p-10">
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