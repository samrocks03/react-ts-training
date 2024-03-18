import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset } from "../Redux/counterActions";
import { CounterState } from "../Redux/counterReducer";

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state: CounterState)=> state.value);

  return (
    <div className="container">
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
      <p>Count: {counter}</p>
    </div>
  );
};

export default Counter;
/*
      Redux is state containter for JS apps   
      - to manage global state in a predictable way, redux is used.
      - the patterns and tools provided by Redux makes it easier to understand when, where, why
        and how the state of your app.. is being updated, and how your application logic
        will behave when those changes occur.
  
      - Guides u towards writing code i.e predictable and testable, which helps i give 
        confidence that your apk. will work as expected.
  
      - Redux toolkit? 
          -   library for efficient redux development
          -   Batteries included toolset for efficient Redux development
          -   std way to write redux logic in our appliications. 
          -   redux toolkit doesn't need a UI library to works
  
  
      - React-Redux is library that provides binding to use React and redux together in an apk.
  
      - When to use Redux? 
          - large amount of app state that are needed in many places in the app.
          - The app state is frequently updated over time
          - The app has medium/large-sized codebase, and might be worked on by many people
  
      Redux core concepts:
          - Store --> HOlds the state of the application
          - Action --> Describes what happened
          - Reducer --> Ties the `Store` and `Action` together, and 
                          describes how to update the state.
  
  
      Redux 3 principles:
          -   The global state of your application is stored as an object inside a single store
          
          -   The only way to change the state is to dispatch an action, an object that describes what happened
  
          -   To specify how the state is updated based on actions, you write pure reducers
              Reducer --> (previousState, action) => newState.
      
      */
