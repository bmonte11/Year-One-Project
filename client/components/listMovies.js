import React from 'react'
import {Link} from 'react-router-dom'

export default class MovieList extends React.Component {
  render() {
    let movies = this.props.movies
    // console.log(movies, 'listMovies component')
    return movies.map(movie => {
      let destination = `/${movie.Title}/${movie.imdbID}`
      return (
        <div className="movie-info" key={movie.id}>
          <Link to={destination}>
            {' '}
            <div>{movie.Title}</div>{' '}
          </Link>
          {/* <div>{movie.Source.Director}</div> */}
          <div>{movie.Year}</div>
          {/* <div>{movie.Source.Plot}</div> */}
          <img src={movie.Poster} />
        </div>
      )
    })
  }
}
