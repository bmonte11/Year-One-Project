import React from 'react'
import axios from 'axios'
import MovieList from './listMovies'

// const options = {
//   method: 'GET',
//   url:
//     'https://ivaee-internet-video-archive-entertainment-v1.p.rapidapi.com/entertainment/search/',
//   headers: {
//     'content-type': 'application/json',
//     'x-rapidapi-key': 'fd7b15974cmsh8a07e9234699e3cp16b971jsnd504ba3dbbbb',
//     'x-rapidapi-host':
//       'ivaee-internet-video-archive-entertainment-v1.p.rapidapi.com'
//   }
// }

const options = {
  method: 'GET',
  url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
  params: {s: 'Spiderman', page: '1', r: 'json', type: 'movie'},
  headers: {
    'x-rapidapi-key': 'fd7b15974cmsh8a07e9234699e3cp16b971jsnd504ba3dbbbb',
    'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com'
  }
}

export default class Movies extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '',
      clicked: false,
      movie: {}
    }
    this.myChangeHandler = this.myChangeHandler.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  myChangeHandler(event) {
    this.setState({input: event.target.value})
  }

  async onSubmit(event) {
    event.preventDefault()
    // options.params = {Title: this.state.input, ProgramTypes: 'Movie'}
    options.params.s = this.state.input
    let response = await axios.request(options)
    try {
      console.log(response.data, 'response in onSubmit')
      this.setState({movie: response.data, clicked: true})
    } catch (error) {
      console.log('error')
    }
  }
  render() {
    const movies = this.state.movie.Search
    return (
      <div>
        <h1>This is a page where you can search movies!</h1>
        <form>
          <input
            type="text"
            onChange={this.myChangeHandler}
            value={this.state.input}
          />
          <button type="submit" onClick={this.onSubmit}>
            Search
          </button>
          {this.state.clicked && <MovieList movies={movies} key={movies.id} />}
        </form>
      </div>
    )
  }
}
