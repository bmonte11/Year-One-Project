import React from 'react'
import axios from 'axios'
import MovieList from './listMovies'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {searchMovies} from '../store/movies'

const options = {
  method: 'GET',
  url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
  params: {s: 'Spiderman', page: '1', r: 'json', type: 'movie'},
  headers: {
    'x-rapidapi-key': 'fd7b15974cmsh8a07e9234699e3cp16b971jsnd504ba3dbbbb',
    'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com'
  }
}

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
      // this.props.history.push(`${this.state.input}`)
    } catch (err) {
      console.log(err)
    }
  }
  render() {
    const movies = this.props.film
    return (
      <div>
        <form>
          <input
            type="text"
            placeholder="Type in a movie title..."
            onChange={this.myChangeHandler}
            value={this.state.input}
          />
          <button type="submit" onClick={this.onSubmit}>
            Search
          </button>
          {movies !== {} && <MovieList movies={movies} key={movies.imdbID} />}
        </form>
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
