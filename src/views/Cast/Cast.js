import { useState, useEffect } from "react";
import { toast } from "react-toastify";
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
          {cast.map((item) => (
            <li key={item.id}>
              <img
                src={
                  item.profile_path
                    ? `https://image.tmdb.org/t/p/w300/${item.profile_path}`
                    : noImage
                }
                alt={item.name}
                width="100"
                height="150"
              />
              <p>{item.name}</p>
              <p>{item.character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Cast;
