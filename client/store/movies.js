import axios from 'axios'

const GET_MOVIES = 'GET_MOVIES'
const SET_MOVIE = 'SET_MOVIE'

export const getMovies = movies => {
  return {type: GET_MOVIES, movies}
}

export const setMovie = movie => {
  return {
    type: SET_MOVIE,
    movie
  }
}

export function fetchMovie(movie) {
  return async function(dispatch) {
    try {
      const result = await axios.get(`/api/movies/${movie}`)
      dispatch(setMovie(result.data))
    } catch (err) {
      console.log(err)
    }
  }
}

export function searchMovies(input) {
  return async function(dispatch) {
    try {
      let response = await axios.get(`/api/movies/search/${input}`)
      console.log(response, 'hello from the thunk')
      dispatch(getMovies(response.data))
    } catch (err) {
      console.log(err)
    }
  }
}

export default function(state = [], action) {
  switch (action.type) {
    case SET_MOVIE:
      return action.movie
    case GET_MOVIES:
      return action.movies
    default:
      return state
  }
}
