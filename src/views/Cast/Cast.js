import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { getMovieCast } from "../../services/ServiceAPI";
import noImage from "../../images/notFound.png";

const Cast = ({ movieId }) => {
  const [cast, setCast] = useState(null);

  useEffect(() => {
    getMovieCast(movieId)
      .then(({ data }) => {
        if (data.cast.length === 0) {
          toast.info("Sorry, cast is not available");
        }
        setCast(data.cast);
      })
      .catch((error) =>
        toast.error("Woops, something went wrong... Try again later.")
      );
  }, [movieId]);

  return (
    <>
      {cast && (
        <ul>
          {cast.map(({ id, profile_path, name, character }) => (
            <li key={id}>
              <img
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w300/${profile_path}`
                    : noImage
                }
                alt={name}
                width="100"
                height="150"
              />
              <p>{name}</p>
              <p>{character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

Cast.propTypes = {
  movieId: PropTypes.string.isRequired,
};

export default Cast;
