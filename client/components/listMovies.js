import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

class MovieList extends React.Component {
  render() {
    let movies = this.props.film.movies
    return (
      <div className="movie-list">
        {movies.map(movie => {
          let destination = `/${movie.Title}/${movie.imdbID}`
          return (
            <div className="movie-info" key={movie.imdbID}>
              {' '}
              <Link to={destination}>
                <img
                  className="poster"
                  src={
                    movie.Poster === 'N/A'
                      ? 'https://www.2queue.com/2queue/wp-content/uploads/sites/6/tdomf/4299/movie-poster-coming-soon.png'
                      : movie.Poster
                  }
                />
              </Link>
              <div className="card-info">
                <h3 className="title">{movie.Title}</h3>{' '}
                {/* <div>{movie.Source.Director}</div> */}
                <h4 className="year">{movie.Year}</h4>
                {/* <div>{movie.Source.Plot}</div> */}
              </div>
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
