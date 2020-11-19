import axios from 'axios'

const SET_MOVIES = 'SET_MOVIES'

export const setMovies = movies => {
  return {type: SET_MOVIES, movies: movies}
}

export function fetchMovies() {
  return async function(dispatch) {
    try {
      const result = await axios.get('/api/movies')
      dispatch(setMovies(result.data))
    } catch (err) {
      console.error(err)
    }
  }
}

export default function(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.movies
    default:
      return state
  }
}
