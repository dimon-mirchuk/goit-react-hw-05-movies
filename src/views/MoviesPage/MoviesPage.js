import { useState, useEffect } from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { getSearchMovie } from "../../services/ServiceAPI";
import SearchBar from "../../components/SearchBar";
import noImage from "../../images/notFound.png";
import styles from "./MoviesPage.module.css";

const { filmList, filmItem, filmTitle } = styles;

const MoviesPage = () => {
  const history = useHistory();
  const location = useLocation();
  const [movies, setMovies] = useState(null);

  const searchQuery = new URLSearchParams(location.search).get("query") ?? "";

  const onChangeQuery = (query) => {
    history.push({ ...location, search: `query=${query}` });
  };

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    getSearchMovie(searchQuery)
      .then(({ data }) => {
        if (data.results.length === 0) {
          toast.error(`There are no movies on your request "${searchQuery}"`);
          setMovies([]);
        }
        setMovies(data.results);
      })
      .catch((error) =>
        toast.error("Woops, something went wrong... Try again later.")
      );
  }, [searchQuery]);

  return (
    <section>
      <SearchBar onSubmit={onChangeQuery} />
      {movies && (
        <ul className={filmList}>
          {movies.map(({ id, poster_path, title }) => (
            <li key={id} className={filmItem}>
              <NavLink
                to={{
                  pathname: `/movies/${id}`,
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
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default MoviesPage;
