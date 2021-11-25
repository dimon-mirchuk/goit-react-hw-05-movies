import { useState, useEffect } from "react";
import { Link, useRouteMatch, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { getTrendingMovies } from "../../services/ServiceAPI";
import noImage from "../../images/notFound.png";
import styles from "./HomePage.module.css";

const { title, filmList, filmItem, filmTitle } = styles;

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const { url } = useRouteMatch();
  const location = useLocation();

  useEffect(() => {
    getTrendingMovies()
      .then(({ data }) => setMovies(data.results))
      .catch((error) =>
        toast.error("Woops, something went wrong... Try again later.")
      );
  }, []);

  return (
    <section>
      {movies && (
        <>
          <h1 className={title}>Trending today</h1>

          <ul className={filmList}>
            {movies.map(({ id, poster_path, title }) => (
              <li key={id} className={filmItem}>
                <Link
                  to={{
                    pathname: `${url}movies/${id}`,
                    state: { from: location },
                  }}
                >
                  <img
                    src={
                      poster_path
                        ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                        : noImage
                    }
                    alt={title}
                  />
                  <p className={filmTitle}>{title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
};

export default HomePage;
