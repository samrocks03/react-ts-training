// /* eslint-disable @typescript-eslint/no-unused-vars */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NewTodo from "./NewTodo";
import Header from "./Header";
import DisplayTodo from "./DisplayTodo";
import DisplayIndividualTodo from "./DisplayIndividualTodo";

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

const Home = () => {
  return (
    <div className="home">
      <Router>
        <Header />
        <Routes>
          {/* <Route path=''/> */}
          <Route path='/' element={<DisplayTodo/>} />
          <Route path='/add' element={<NewTodo/>} />
          <Route path='display/:id' element={<DisplayIndividualTodo/>}/>
          <Route path='*' element= {<div> Element not found </div>}/>
        </Routes>
      </Router>
    </div>
  );
};

export default Home;
