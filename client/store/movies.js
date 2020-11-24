import axios from 'axios'

const ADD_MOVIE = 'ADD_MOVIE'
const UPDATE_TALLY = 'UPDATE_TALLY'

export const addMovie = movie => {
  return {type: ADD_MOVIE, movie}
}

export const updateTally = movie => {
  return {
    type: UPDATE_TALLY,
    movie
  }
}

export function postMovie(movie) {
  return async function(dispatch) {
    try {
      const result = await axios.post('/api/search/:movie', {
        movieId: movie.movieId,
        name: movie.name,
        thumbsUp: movie.thumbsUp,
        thumbsDown: movie.thumbsDown
      })
      if (result.status === 200) {
        dispatch(addMovie(result.data))
      }
      console.log(result, 'this is the result from the thunk')
    } catch (err) {
      console.error(err)
    }
  }
}

// export function thumbsUp(movie) {
//   return async function (dispatch) {
//     try {
//       const result = await axios.put('/api/search/:movie', {
//         name: movie.name,
//       })
//       dispatch(updateTally(result.data))
//       console.log(result, 'this is the result from the thunk')
//     } catch (err) {
//       console.error(err)
//     }
//   }
// }

export default function(state = [], action) {
  switch (action.type) {
    case ADD_MOVIE:
      return action.movies
    default:
      return state
  }
}
