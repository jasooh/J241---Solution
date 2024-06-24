import Grid from "./components/Grid"

function App() {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-white">
        <div className="p-10 w-11/12 h-5/6 flex items-center justify-center rounded-lg shadow-xl">
        <div className="flex flex-col items-center">
          <label className="mb-3 font-bold">GRID</label>
          <div className="w-[20rem] h-[21rem] mb-5">
              <Grid rows={20} columns={20} />
          </div>
          {/* Start stop buttons */}
          <div className="flex gap-5 justify-center">
            <button className="font-semibold">START</button>
            <button className="font-semibold">PAUSE</button>
          </div>
          {/* Time input */}
          <div className="flex items-baseline gap-3">
              <label className="font-semibold">TIME INTERVAL: </label>
              <input className="border rounded py-1 px-2 my-2 mb-5" type="number" defaultValue={1} min={0}/>
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
