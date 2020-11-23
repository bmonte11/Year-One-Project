import React from 'react'
import {Link} from 'react-router-dom'

export default class MovieList extends React.Component {
  render() {
    let movies = this.props.movies
    console.log(movies, 'listMovies component')
    return movies.map(movie => {
      let destination = `/${movie.Source.Title}`
      return (
        <div className="movie-info" key={movie.key}>
          <Link to={destination}>
            {' '}
            <div>{movie.Source.Title}</div>{' '}
          </Link>
          {/* <div>{movie.Source.Director}</div> */}
          <div>{movie.Source.Year}</div>
          {/* <div>{movie.Source.Plot}</div> */}
          {/* <img src={movie.Source.Poster} /> */}
        </div>
      )
    })
  }
}
