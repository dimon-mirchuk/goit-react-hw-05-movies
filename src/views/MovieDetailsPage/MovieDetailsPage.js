import { useState, useEffect } from "react";
import {
  useHistory,
  useLocation,
  useParams,
  //   useRouteMatch,
} from "react-router";
import { toast } from "react-toastify";
import { getMovieById } from "../../services/ServiceAPI";
import noImage from "../../images/notFound.png";

const MovieDetails = () => {
  const history = useHistory();
  const location = useLocation();
  const { movieId } = useParams();
  //   const { url, path } = useRouteMatch();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    console.log(movieId);
    getMovieById(movieId)
      .then(({ data }) => {
        console.log(data);
        setMovie(data);
      })
      .catch((error) =>
        toast.error("Woops, something went wrong... Try again later.")
      );
  }, [movieId]);

  console.log(movie);

  const onGoBack = () => {
    history.push(location?.state?.from?.location ?? "/movies");
  };

  return (
    <>
      <button type="button" onClick={onGoBack}>
        Go Back
      </button>
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : noImage
        }
        alt={movie.title}
        width="250"
      />
      <h1>{movie.title}</h1>
      {movie.genres && (
        <>
          <h3>Genres</h3>
          <ul>
            {movie.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </>
      )}
      <p>Vote average: {movie.vote_average}</p>
      <h3>Overview</h3>
      <p>{movie.overview}</p>
    </>
  );
};

export default MovieDetails;
