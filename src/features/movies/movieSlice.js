import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { APIKey } from "../../common/apis/MovieApiKey";

// directly making the call in redux
// first argument is simple string defined to identify the user
export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async (term) => {
    // const movieText = "Love";
    const response = await movieApi.get(
      `?apiKey=${APIKey}&s=${term}&type=movie`
    );
    return response.data;
  }
);

export const fetchAsyncShows = createAsyncThunk(
  "movies/fetchAsyncShows",
  async (term) => {
    // const seriesText = "Love";
    const response = await movieApi.get(
      `?apiKey=${APIKey}&s=${term}&type=series`
    );
    return response.data;
  }
);

export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
  "movies/fetchAsyncMovieOrShowDetail",
  async (id) => {
    const response = await movieApi.get(`?apiKey=${APIKey}&i=${id}&plot=full`);
    return response.data;
  }
);

const initialState = {
  movies: {},
  shows: {},
  selectedMovieOrShow: {},
  loader: false,
};

const movieSlice = createSlice({
  name: "movies", // to be given as per state
  initialState: initialState,
  reducers: {
    // addMovies: (state, { payload }) => {
    //   state.movies = payload;
    // },

    removeSelectedMovieOrShow: (state) => {
      state.selectedMovieOrShow = {};
    },
  },

  extraReducers: {
    //   will define the lifecyle of an async request
    [fetchAsyncMovies.pending]: (state) => {
      console.log("Pending");
      return {
        ...state,
        loader: true,
      };
    },
    [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully");
      return {
        ...state,
        movies: payload,
        loader: false,
      };
    },
    [fetchAsyncMovies.rejected]: () => {
      console.log("Rejected");
    },

    [fetchAsyncShows.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully");
      return {
        ...state,
        shows: payload,
      };
    },

    // for the details
    [fetchAsyncMovieOrShowDetail.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully");
      return {
        ...state,
        selectedMovieOrShow: payload,
      };
    },
  },
});

// console.log(movieSlice.actions);

export const { removeSelectedMovieOrShow } = movieSlice.actions;
// state.movies --> name
// and the property name is movies so again movies
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const loader = (state) => state.movies.loader; // exposed the loader to outside

// for the details page state access
export const getSelectedMovieOrShow = (state) =>
  state.movies.selectedMovieOrShow;
export default movieSlice.reducer;
