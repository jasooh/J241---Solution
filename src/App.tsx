import Grid from "./components/Grid";

function App() {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-white">
      <div className="p-10 w-2/3 h-2/3 rounded-xl border-4">
        <Grid rows={5} columns={5} />
      </div>
    </div>
  );
}

export default App;
