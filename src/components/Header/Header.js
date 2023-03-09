import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchAsyncMovies,
  fetchAsyncShows,
} from "../../features/movies/movieSlice";
import user from "../../images/user.png";
import "./Header.scss";

export default function Header() {
  const [term, setTerm] = useState("");
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault(); // prevents the default refresh of the page

    if (term === "") alert("Please enter a term to search");
    // console.log(term);
    else {
      dispatch(fetchAsyncMovies(term));
      dispatch(fetchAsyncShows(term));
      setTerm("");
    }
  };

  return (
    <div>
      <div className="header">
        <div className="logo">
          <Link to="/">Movie App </Link>
        </div>

        {/* Adding the search functionality */}

        <div className="search-bar">
          <form action="" onSubmit={submitHandler}>
            <input
              type="text"
              value={term}
              placeholder="Search Movies or Shows"
              onChange={(e) => setTerm(e.target.value)}
            />

            <button type="submit">
              <i className="fa fa-search"></i>
            </button>
          </form>
        </div>

        <div className="user-image">
          <img src={user} alt="" />
        </div>
      </div>
    </div>
  );
}
