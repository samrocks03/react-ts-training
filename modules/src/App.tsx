// App.tsx
import "./App.css";
import Counter from "./Components/Counter";
import "bootstrap/dist/css/bootstrap.min.css";
import { store } from "./Store/store";
import { Provider } from "react-redux";
function App() {
  return (
    <Provider store={store}>
      <>
        <Counter />
      </>
    </Provider>
  );
}

export default App;
