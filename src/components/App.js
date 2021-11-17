import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navigation from "./Navigation";
import HomePage from "../views/HomePage";

function App() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/movies" exact></Route>
      </Switch>
      <ToastContainer />
    </>
  );
}

export default App;
