import { Link, NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";
import { ReactComponent as Logo } from "../../images/logo.svg";

const {
  navigation,
  logo,
  navigationList,
  navigationItem,
  navigationItemActive,
} = styles;

const Navigation = () => (
  <header>
    <nav className={navigation}>
      <Link to="/" className={logo}>
        <Logo />
      </Link>
      <ul className={navigationList}>
        <li>
          <NavLink
            to="/"
            exact
            className={navigationItem}
            activeClassName={navigationItemActive}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/movies"
            className={navigationItem}
            activeClassName={navigationItemActive}
          >
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  </header>
);

export default Navigation;
