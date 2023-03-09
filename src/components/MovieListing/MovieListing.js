import React from "react";
import "./MovieListing.scss";
import { useSelector } from "react-redux";
import {
  getAllMovies,
  getAllShows,
  loader,
} from "../../features/movies/movieSlice";
import MovieCard from "../MovieCard/MovieCard";
import Slider from "react-slick";
import { Settings } from "../../common/settings";

export default function MovieListing() {
  // useSelector needs the state
  const movies = useSelector(getAllMovies);
  const shows = useSelector(getAllShows);
  const load = useSelector(loader);
  //   console.log(movies);
  console.log(shows);

  let renderMovies = "",
    renderShows = "";

  renderMovies =
    movies.Response === "True" ? (
      movies.Search.map((movie, index) => {
        return <MovieCard key={index} data={movie} />;
      })
    ) : (
      <div className="movies-error">
        <h3>{movies.Error}</h3>
      </div>
    );

  renderShows =
    shows.Response === "True" ? (
      shows.Search.map((show, index) => {
        return <MovieCard key={index} data={show} />;
      })
    ) : (
      <div className="movies-error">
        <h3>{shows.Error}</h3>
      </div>
    );

  return (
    <div className="movie-wrapper">
      {load === true ? (
        <div className="loader">
          <h3>...Loading</h3>
        </div>
      ) : (
        <>
          <div className="movie-list">
            <h2>Movies</h2>
            {/* <div className="movie-container">{renderMovies}</div> */}

            <div className="movie-container">
              <Slider {...Settings}>{renderMovies}</Slider>
            </div>
          </div>
          <div className="show-list">
            <h2>Shows</h2>
            {/* <div className="movie-container">{renderShows}</div> */}
            <div className="movie-container">
              <Slider {...Settings}>{renderShows}</Slider>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
