import { useState } from "react";


/*
    Redux is state containter for JS apps   
    - to manage global state in a predictable way, redux is used.
    - the patterns and tools provided by Redux makes it easier to understand when, where, why
      and how the state of your app.. is being updated, and how your application logic
      will behave when those changes occur.

    - Guides u towards writing code i.e predictable and testable, which helps i give 
      confidence that your apk. will work as expected.

    - Redux toolkit? 
        -   Batteries included toolset for efficient Redux development
        -   std way to write redux logic in our appliications. 
*/
const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <h1>Counter</h1>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

export default Counter;
