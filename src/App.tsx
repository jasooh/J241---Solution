// Components
import Grid from "./components/Grid"

// Context
import { TickProvider } from "./context/TickContext";

function App() {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-white">
      <TickProvider>
        <Grid rows={30} columns={30} />
      </TickProvider>
    </div>
  );
}

export default App;
