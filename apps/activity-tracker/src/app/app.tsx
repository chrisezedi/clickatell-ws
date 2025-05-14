import { ChangeEvent, useEffect, useReducer, useState } from "react";
import { socket } from "./socket";
import { initialState, reducer } from "./state";
import "./app.module.scss";

export function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const handleActivity = (payload: string) => {
      dispatch({ type: "add", payload });
    };

    socket.on('activity', handleActivity);

    return () => {
      socket.off('activity', handleActivity);
    };
  }, [state])

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: 'search', payload: searchTerm })
    }, 300);
  }, [searchTerm])

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchTerm(event.target.value)
  }

  return (
    <main>
      <header>
        <h1>Activity Tracker</h1>
        <input type="text" placeholder="enter search term" onChange={handleSearch} />
      </header>
      {
        state.activities.length === 0 ? <p className="text-center">No Activities Yet!</p> :
          <ul>
            {
              state.activities.map(activity => <li key={activity}>{activity}</li>)
            }
          </ul>
      }
    </main>
  );
}

export default App;
