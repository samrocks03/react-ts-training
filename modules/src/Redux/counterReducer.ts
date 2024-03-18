// Redux/counterReducer.ts
import { Reducer } from "redux";

export type CounterAction =
    | { type: "INCREMENT" }
    | { type: "DECREMENT" }
    | { type: "RESET" };

export interface CounterState {
    value: number;
}

// Define the initial state
const initialState: CounterState = {
    value: 0
};


export const counterReducer: Reducer<CounterState, CounterAction> = (
    state = initialState,
    action: CounterAction
) => {
    switch (action.type) {
        case "INCREMENT":
            // for understanding purpose, 
            // first, we need to copy the entire initial state,
            // then, apply our changes to it.
            return { ...state, value: state.value + 1 }
        case "DECREMENT":
            return { ...state, value: state.value - 1 }
        case "RESET":
            return { ...state, value: 0 }
        default:
            return state
    }
}

