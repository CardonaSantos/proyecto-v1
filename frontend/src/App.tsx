import "./App.css";
import { Button } from "./components/ui/button";
import { Calendar } from "./components/ui/calendar";

function App() {
  return (
    <>
      <div className="mb-5">
        <h1>Vite + React</h1>

        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>

      <div className="">
        <h2>Calendario y button</h2>
        <Button>Mi button de shadcn</Button>
        <Calendar />
      </div>
    </>
  );
}

export default App;
