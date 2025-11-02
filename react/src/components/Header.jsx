import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="Header">
      <h1>React</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="props">Props</Link>
          </li>
          <li>
            <Link to="hooks/use-state">State</Link>
          </li>
          <li>
            <Link to="hooks/use-effect">Effect</Link>
          </li>
          <li>
            <Link to="hooks/use-context">Context</Link>
          </li>
          <li>
            <Link to="hooks/use-ref">Ref</Link>
          </li>
          <li>
            <Link to="hooks/use-memo">Memo</Link>
          </li>
          <li>
            <Link to="hooks/use-reducer">Reducer</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
