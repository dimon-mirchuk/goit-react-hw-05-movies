import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navigation from "./Navigation";
import HomePage from "../views/HomePage";
import MoviesPage from "../views/MoviesPage";

function App() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/movies" exact>
          <MoviesPage />
        </Route>
      </Switch>
      <ToastContainer />
    </>
  );
}

export default App;
