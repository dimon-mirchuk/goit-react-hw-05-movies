import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getMovieReviews } from "../../services/ServiceAPI";
import styles from "./Reviews.module.css";

const { reviewList, reviewItem, reviewAuthor, reviewText } = styles;

const Reviews = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getMovieReviews(movieId)
      .then(({ data }) => {
        if (data.results.length === 0) {
          toast.info("Sorry, reviews is not available");
        }
        setReviews(data.results);
      })
      .catch((error) =>
        toast.error("Woops, something went wrong... Try again later.")
      );
  }, [movieId]);

  return (
    <>
      {reviews.length > 0 ? (
        <ul className={reviewList}>
          {reviews.map(({ id, author, content }) => (
            <li key={id} className={reviewItem}>
              <h3 className={reviewAuthor}>{`Author: ${author}`}</h3>
              <p className={reviewText}>{content}</p>
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
