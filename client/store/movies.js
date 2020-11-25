import axios from 'axios'

const GET_MOVIE = 'GET_MOVIE'

export const getMovie = movie => {
  return {type: GET_MOVIE, movie}
}

// export const updateTally = (movie) => {
//   return {
//     type: UPDATE_TALLY,
//     movie,
//   }
// }

export function fetchMovie(movie) {
  return async function(dispatch) {
    try {
      const result = await axios.get(`/api/movies/${movie}`)
      dispatch(getMovie(result.data))
    } catch (err) {
      console.log(err)
    }
  }
}

// export function thumbsUp(movie) {
//   return async function (dispatch) {
//     try {
//       const result = await axios.put('/api/movies/:movie', {
//         name: movie.name,
//       })
//       dispatch(updateTally(result.data))
//       console.log(result, 'this is the result from the thunk')
//     } catch (err) {
//       console.error(err)
//     }
//   }
// }

// export function thumbsDown(movie) {
//   return async function (dispatch) {
//     try {
//       const result = await axios.put('/api/movies/:movie', {
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
    case GET_MOVIE:
      return action.movie
    default:
      return state
  }
}
