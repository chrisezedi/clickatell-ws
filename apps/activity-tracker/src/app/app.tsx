import { useEffect } from "react";
import {socket} from "./socket";

export function App() {
  useEffect(() => {
    socket.on('activity', (message)=> {
      console.log("CLient",message)
    })
  })
  return (
    <h1>Hello</h1>
  );
}

export default App;
