import axios from 'axios'

const GET_MOVIES = 'GET_MOVIES'
const SET_MOVIE = 'SET_MOVIE'

//Initial State

const defaultMovie = {film: {}, movies: []}

export const getMovies = movies => {
  return {type: GET_MOVIES, movies}
}

export const setMovie = movie => {
  return {
    type: SET_MOVIE,
    movie
  }
}

export function fetchMovie(movie, id) {
  return async function(dispatch) {
    try {
      const result = await axios.get(`/api/movies/${movie}/${id}`)
      dispatch(setMovie(result.data))
    } catch (err) {
      console.log(err)
    }
  }
}

// export function mountMovie(movie){
//   return async function (dispatch) {
//     try {
//       const result = await axios.get(`/api/movies/${movie}`)
//       dispatch(setMovie(result.data))
//     } catch (err) {
//       console.log(err)
//     }
//   }
// }

export function searchMovies(input) {
  return async function(dispatch) {
    try {
      let response = await axios.get(`/api/movies/search/${input}`)
      dispatch(getMovies(response.data))
    } catch (err) {
      console.log(err)
    }
  }
}

export default function(state = defaultMovie, action) {
  switch (action.type) {
    case SET_MOVIE:
      return {...state, film: {...action.movie}}
    case GET_MOVIES:
      return {...state, movies: [...action.movies]}
    default:
      return state
  }
}
