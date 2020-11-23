import React from 'react'
import axios from 'axios'

const options = {
  method: 'GET',
  url:
    'https://ivaee-internet-video-archive-entertainment-v1.p.rapidapi.com/entertainment/search/',
  headers: {
    'content-type': 'application/json',
    'x-rapidapi-key': 'fd7b15974cmsh8a07e9234699e3cp16b971jsnd504ba3dbbbb',
    'x-rapidapi-host':
      'ivaee-internet-video-archive-entertainment-v1.p.rapidapi.com'
  }
}

// const options = {
//   method: 'GET',
//   url: 'https://imdb-internet-movie-database-unofficial.p.rapidapi.com/search/',
//   headers: {
//     'x-rapidapi-key': 'fd7b15974cmsh8a07e9234699e3cp16b971jsnd504ba3dbbbb',
//     'x-rapidapi-host': 'imdb-internet-movie-database-unofficial.p.rapidapi.com',
//   },
// }

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
    options.params = {Title: this.state.input, ProgramTypes: 'Movie'}
    // options.url = `https://imdb-internet-movie-database-unofficial.p.rapidapi.com/search/${this.state.input}`
    let response = await axios.request(options)
    try {
      console.log(response.data, 'response in onSubmit')
      this.setState({movie: response.data, clicked: true})
    } catch (error) {
      console.log('error')
    }
    // fetch(`http://www.omdbapi.com/?t=${this.state.input}&apikey=35db4ef`)
    //   .then(resp => resp.json())
    //   .then(data => this.setState({movie: data, clicked: true}))
    // console.log(response, 'response in component did mount')
    // this.props.history.push('/movies')
  }
  render() {
    console.log(this.state.movie)
    const movies = this.state.movie.Hits
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
          {this.state.clicked &&
            movies.map(movie => {
              return (
                <div className="movie-info" key={movie.id}>
                  <div>{movie.Source.Title}</div>
                  {/* <div>{movie.Source.Director}</div> */}
                  <div>{movie.Source.Year}</div>
                  {/* <div>{movie.Source.Plot}</div> */}
                  {/* <img src={movie.Source.Poster} /> */}
                </div>
              )
            })}
        </form>
      </div>
    )
  }
}
