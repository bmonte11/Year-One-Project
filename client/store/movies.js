import axios from 'axios'
const URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=35db4ef'

const SET_MOVIES = 'SET_MOVIES'

export const setMovies = movies => {
  return {type: SET_MOVIES, movies: movies}
}

export function fetchMovies() {
  return async function(dispatch) {
    try {
      const result = await axios.get(URL)
      dispatch(setMovies(result.data))
      console.log(result, 'this is the result from the thunk')
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
