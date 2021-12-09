import { Link, NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";
import { ReactComponent as Logo } from "../../images/logo.svg";
import LoginBtn from "../Authorization/LoginBtn";

const {
  header,
  navigation,
  logo,
  navigationList,
  navigationItem,
  navigationItemActive,
} = styles;

const Navigation = () => (
  <header className={header}>
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
    <LoginBtn />
  </header>
);

export default Navigation;
