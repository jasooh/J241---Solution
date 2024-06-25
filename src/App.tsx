// Hooks
import { useState } from "react";

// Components
import Grid from "./components/Grid";

// Context provider
import { TickProvider } from "./context/TickContext";

function App() {
  return (
    <div className="flex gap-5 items-center justify-center w-screen h-screen bg-white">
      <TickProvider>
        <Grid />
      </TickProvider>
    </div>
  );
};

export default App;
