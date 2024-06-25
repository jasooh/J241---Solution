// Components
import Grid from "./components/Grid"

// Context
import { TickProvider } from "./context/TickContext";

function App() {
  return (
    <div className="flex gap-5 items-center justify-center w-screen h-screen bg-white">
      <TickProvider>
        <Grid rows={50} columns={50} />
      </TickProvider>
    </div>
  );
}

export default App;
