import { useState, useEffect } from "react";
import { Link, useRouteMatch, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { getTrendingMovies } from "../../services/ServiceAPI";
import noImage from "../../images/notFound.png";

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
    <>
      {movies && (
        <>
          <h1>Trending today</h1>

          <ul>
            {movies.map(({ id, poster_path, title }) => (
              <li key={id}>
                <Link
                  to={{
                    pathname: `${url}movies/${id}`,
                    state: { from: { location } },
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
                  <p>{title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default HomePage;
