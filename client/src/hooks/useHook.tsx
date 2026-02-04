import { useReducer } from "react";

const MyApp = () => {
  type InitialState = {
    loading: boolean;
    data: string | null;
    error: string | null;
    count: number;
  };

  type Action =
    | { type: "FETCH" }
    | { type: "SUCCESS"; payload: string }
    | { type: "ERROR"; payload: string }
    | { type: "INCREASE" };

  const initialState: InitialState = {
    loading: false,
    data: null,
    error: null,
    count: 0,
  };

  const reducer = (state: InitialState, action: Action): InitialState => {
    switch (action.type) {
      case "FETCH":
        return { ...state, loading: true, error: null };
      case "SUCCESS":
        return { ...state, loading: false, data: action.payload, error: null };
      case "ERROR":
        return { ...state, loading: false, data: null, error: action.payload };
      case "INCREASE":
        return { ...state, count: state.count + 1 };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <h1>{state.data}</h1>
      <button onClick={() => dispatch({ type: "INCREASE" })}>fetch</button>
    </div>
  );
};

export default MyApp;
