import { useState } from "react";

// Components
import Grid from "./components/Grid"

// Context
import { TickProvider } from "./context/TickContext";

function App() {
  const [rows, setRows] = useState(10);
  const [columns, setColumns] = useState(10);

  return (
    <div className="flex gap-5 items-center justify-center w-screen h-screen bg-white">
      <TickProvider>
      <div className="flex flex-col gap-10 w-[20%] h-[50%] items-center shadow-xl p-10">
          <label className="font-bold">STATUS WINDOW</label>
            <div className="flex flex-col items-center">
              <label>Rows</label>
              <input className="rounded w-16 py-1 px-2 mb-5 text-center shadow" type="number" step="1" defaultValue={10} min={1} max={100} value={rows} onChange={(event) => setRows(parseInt(event.target.value))} />
              <label>Columns</label>
              <input className="rounded w-16 py-1 px-2 mb-5 text-center shadow" type="number" step="1" defaultValue={10} min={1} max={100} value={columns} onChange={(event) => setColumns(parseInt(event.target.value))} />
            </div>
        </div>
        <Grid rows={rows} columns={columns} />
      </TickProvider>
    </div>
  );
}

export default App;
