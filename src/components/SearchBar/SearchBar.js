import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useState } from "react";
import styles from "./SearchBar.module.css";

const { form, formLabel, formField, formInput, formButton } = styles;

const SearchBar = ({ onSubmit }) => {
  const [name, setName] = useState("");

  const onHandleChange = (e) => {
    setName(e.currentTarget.value.toLowerCase());
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();

    if (name.trim() === "") {
      toast.info("Please enter your query!");
      return;
    }

    onSubmit(name);
    setName("");
  };

  return (
    <form onSubmit={onHandleSubmit} className={form}>
      <label className={formField}>
        <span className={formLabel}>{"Please, enter movie name:"}</span>
        <input
          type="text"
          value={name}
          autoComplete="off"
          autoFocus
          onChange={onHandleChange}
          className={formInput}
        ></input>
        <button type="submit" className={formButton}>
          Search
        </button>
      </label>
    </form>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
