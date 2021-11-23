import { useState, useEffect, Suspense, lazy } from "react";
import {
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import { toast } from "react-toastify";
import { getMovieById } from "../../services/ServiceAPI";
import noImage from "../../images/notFound.png";
import Spinner from "../../components/Spinner";
import styles from "./MoviesDetailsPage.module.css";

const { filmContainer, goBackBtn, section } = styles;

const Cast = lazy(() => import("../Cast" /* webpackChunkName: "Cast" */));
const Reviews = lazy(() =>
  import("../Reviews" /* webpackChunkName: "Reviews" */)
);

const MovieDetails = () => {
  const history = useHistory();
  const location = useLocation();
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    getMovieById(movieId)
      .then(({ data }) => {
        setMovie(data);
      })
      .catch((error) =>
        toast.error("Woops, something went wrong... Try again later.")
      );
  }, [movieId]);

  const onGoBack = () => {
    console.log(location.state.from);
    if (location.state?.from.location) {
      history.push(location.state.from.location);
      return;
    }
    history.push(location.state.from);
  };

  const { poster_path, title, genres, vote_average, overview } = movie;

  return (
    <section className={section}>
      <button type="button" onClick={onGoBack} className={goBackBtn}>
        Go Back
      </button>
      <div className={filmContainer}>
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : noImage
          }
          alt={title}
          width="250"
        />
        <div>
          <h1>{title}</h1>
          <p>User Score: {vote_average * 10}%</p>
          <h2>Overview</h2>
          <p>{overview}</p>
          {genres && (
            <>
              <h3>Genres</h3>
              <ul>
                {genres.map(({ id, name }) => (
                  <li key={id}>
                    <p>{name}</p>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
      <nav>
        <p>Additional information</p>
        <NavLink
          to={{ pathname: `${url}/cast`, state: { from: { location } } }}
        >
          Cast
        </NavLink>
        <NavLink
          to={{ pathname: `${url}/reviews`, state: { from: { location } } }}
        >
          Reviews
        </NavLink>
      </nav>
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path={`${path}:movieId/cast`}>
            <Cast movieId={movieId} />
          </Route>
          <Route path={`${path}:movieId/reviews`}>
            <Reviews movieId={movieId} />
          </Route>
        </Switch>
      </Suspense>
    </section>
  );
};

export default MovieDetails;
