// Components/Header.tsx

import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav>
      Todo Tracker
      <Link className="link" to="/">Home</Link>
      <Link className="link" to="/add"> Add Todo</Link>
      <Link className="link" to="/addtodo/:id"></Link>
    </nav>
  );
};

export default Header;
