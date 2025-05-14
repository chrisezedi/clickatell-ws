import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import { socket } from "./socket";
import { State, Action } from "./models";
import App from './app';
import { reducer } from './state';

jest.mock("./socket", () => ({
  socket: {
    on: jest.fn(),
    off: jest.fn(),
  },
}));

jest.mock("./state", () => {
  const originalModule = jest.requireActual("./state");

  return {
    initialState: {
      activities: [],
      initialState: [],
    },
    reducer: jest.fn((state, action) => {
      return originalModule.reducer(state, action);
    }),
  };
});

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render successfully', () => {
    const { baseElement } = render(
      <App />
    );
    expect(baseElement).toBeTruthy();

    expect(screen.getByText("Activity Tracker")).toBeInTheDocument()

    expect(screen.getByPlaceholderText("enter search term")).toBeInTheDocument();

    expect(screen.getByText("No Activities Yet!")).toBeInTheDocument();
  });

  it("registers socket event handlers on mount", () => {
    render(<App />);
    expect(socket.on).toHaveBeenCalledWith("activity", expect.any(Function));
  });

  it("unregisters socket event handlers on unmount", () => {
    const { unmount } = render(<App />);
    unmount();
    expect(socket.off).toHaveBeenCalledWith("activity", expect.any(Function));
  });

  it("should add a new activity with 'add' action", () => {
    const state: State = {
      activities: [],
      initialState: []
    };

    const action: Action = {
      type: "add",
      payload: "New activity"
    };

    const newState = reducer(state, action);

    expect(newState.activities.length).toBe(1);
    expect(newState.initialState.length).toBe(1);
    expect(newState.activities).toContain("New activity");
    expect(newState.initialState).toContain("New activity");
  });

  it("should filter activities with 'search' action", () => {
      const state: State = {
        activities: ["Read a book", "Write code", "Go running"],
        initialState: ["Read a book", "Write code", "Go running"]
      };

      const newState = reducer(state, {
        type: "search",
        payload: "code"
      });

      expect(newState).toEqual({
        activities: ["Write code"],
        initialState: ["Read a book", "Write code", "Go running"]
      });
    });
});
