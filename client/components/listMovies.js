import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

class MovieList extends React.Component {
  render() {
    let movies = this.props.film.movies
    console.log(movies, 'listMovies')
    return (
      <div className="movie-list">
        {movies.map(movie => {
          let destination = `/${movie.Title}/${movie.imdbID}`
          return (
            <div className="movie-info" key={movie.imdbID}>
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
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    film: state.movies
  }
}

export default withRouter(connect(mapStateToProps)(MovieList))
