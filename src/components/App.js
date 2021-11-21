import { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navigation = lazy(() =>
  import("./Navigation" /* webpackChunkName: "Navigation" */)
);
const HomePage = lazy(() =>
  import("../views/HomePage" /* webpackChunkName: "HomePage" */)
);
const MoviesPage = lazy(() =>
  import("../views/MoviesPage" /* webpackChunkName: "MoviesPage" */)
);
const MovieDetailsPage = lazy(() =>
  import("../views/MovieDetailsPage" /* webpackChunkName: "MovieDetailsPage" */)
);

function App() {
  return (
    <>
      <Suspense fallback={<h2>LOADING...</h2>}>
        <Navigation />
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/movies" exact>
            <MoviesPage />
          </Route>
          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>
        </Switch>
      </Suspense>
      <ToastContainer />
    </>
  );
}

export default App;
