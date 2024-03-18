
// Redux/counterActions.ts
import { CounterAction } from "./counterReducer";

// your actions

export const increment = (): CounterAction => {
    return { type: "INCREMENT" };
}

export const decrement = (): CounterAction => {
    return { type: "DECREMENT" };
}

export const reset = (): CounterAction => {
    return { type: "RESET" };
}
