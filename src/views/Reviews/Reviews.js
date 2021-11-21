import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ShowMore from "react-simple-show-more";
import { getMovieReviews } from "../../services/ServiceAPI";

const Reviews = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getMovieReviews(movieId)
      .then(({ data }) => {
        if (data.results.length === 0) {
          toast.info("Sorry, reviews is not available");
        }
        console.log(data.results);
        setReviews(data.results);
      })
      .catch((error) =>
        toast.error("Woops, something went wrong... Try again later.")
      );
  }, [movieId]);

  return (
    <>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((item) => (
            <li key={item.id}>
              <h2>{`Author:${item.author}`}</h2>
              <ShowMore
                text={item.content}
                length={500}
                showMoreLabel=" Show more >>"
                showLessLabel=" Show less <<"
                style={{
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>We do not have any reviews for this movie.</p>
      )}
    </>
  );
};

export default Reviews;
