import React from 'react'
import axios from 'axios'

const options = {
  method: 'GET',
  url: 'https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/',
  headers: {
    'x-rapidapi-key': 'fd7b15974cmsh8a07e9234699e3cp16b971jsnd504ba3dbbbb',
    'x-rapidapi-host': 'imdb-internet-movie-database-unofficial.p.rapidapi.com'
  }
}

export default class SingleMovie extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movie: {}
    }
    this.onDownvote = this.onDownvote.bind(this)
    this.onUpvote = this.onUpvote.bind(this)
  }
  async componentDidMount() {
    options.url = `https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/${
      this.props.match.params.movie
    }`
    let response = await axios.request(options)
    try {
      console.log(response.data, 'response in singleMovie component did mount')
      this.setState({movie: response.data})
    } catch (error) {
      console.log('error')
    }
  }

  render() {
    if (this.state.movie === {}) {
      return (
        <div>
          <span>Loading...</span>
        </div>
      )
    } else
      return (
        <div>
          <div className="header">
            <h2>Title</h2>
            {this.state.movie.title}
            <img src={this.state.movie.poster} />
            <button type="button" onClick={this.onUpvote}>
              Vote Up
            </button>
            <button type="button" onClick={this.onDownvote}>
              Vote Down
            </button>
          </div>
        </div>
      )
  }
}
