import React from 'react'
import axios from 'axios'
import MovieList from './listMovies'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {searchMovies} from '../store/movies'

class Movies extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input: ''
    }
    this.myChangeHandler = this.myChangeHandler.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  myChangeHandler(event) {
    this.setState({input: event.target.value})
  }

  onSubmit(event) {
    event.preventDefault()
    try {
      this.props.searchMovies(this.state.input)
    } catch (err) {
      console.log(err)
    }
  }
  render() {
    const movies = this.props.film
    return (
      <div className="page">
        <form className="search-input">
          <input
            type="text"
            placeholder="Type in a movie title..."
            onChange={this.myChangeHandler}
            value={this.state.input}
          />
          <button type="submit" onClick={this.onSubmit}>
            Search
          </button>
        </form>
        <div className="movie-list">
          {movies !== {} && <MovieList movies={movies} key={movies.imdbID} />}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    film: state.movies.movies
  }
}

const mapDispatchToProps = dispatch => {
  return {
    searchMovies: input => dispatch(searchMovies(input))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Movies))
