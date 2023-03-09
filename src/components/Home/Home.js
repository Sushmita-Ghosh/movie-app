import React, { useEffect } from "react";
import MovieListing from "../MovieListing/MovieListing";
import {
  fetchAsyncMovies,
  fetchAsyncShows,
} from "../../features/movies/movieSlice";
import { useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();

  // for the first load/ initially
  const movieText = "Love";
  const showText = "Big";
  useEffect(() => {
    dispatch(fetchAsyncMovies(movieText));
    dispatch(fetchAsyncShows(showText));
  }, [dispatch]);

  return (
    <div>
      <div className="banner-img"></div>
      {/* We are going to make a api call and store into the redux */}
      <MovieListing />
    </div>
  );
}
