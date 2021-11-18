import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useState } from "react";

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
    <form onSubmit={onHandleSubmit}>
      <input
        type="text"
        value={name}
        autoComplete="off"
        autoFocus
        placeholder="Please, enter movie name"
        onChange={onHandleChange}
      ></input>
      <button type="submit">Search</button>
    </form>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;