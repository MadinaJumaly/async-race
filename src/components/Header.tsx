import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <h1 className="header__title">Async Race</h1>
      <nav className="header__nav">
        <NavLink to="/garage">Garage</NavLink>
        <NavLink to="/winners">Winners</NavLink>
      </nav>
    </header>
  );
}

export default Header;
