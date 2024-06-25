// Components
import Grid from "./components/Grid";

// Context provider
import { TickProvider } from "./context/TickContext";

function App() {
  return (
    <div className="flex flex-col gap-5 items-center justify-center w-screen h-[100rem] bg-white lg:flex-row lg:h-screen">
      <TickProvider>
        <Grid />
      </TickProvider>
    </div>
  );
};

export default App;
