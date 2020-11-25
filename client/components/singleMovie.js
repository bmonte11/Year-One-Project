import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {fetchMovie} from '../store/movies'

const options = {
  method: 'GET',
  url: 'https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/',
  headers: {
    'x-rapidapi-key': 'fd7b15974cmsh8a07e9234699e3cp16b971jsnd504ba3dbbbb',
    'x-rapidapi-host': 'imdb-internet-movie-database-unofficial.p.rapidapi.com'
  }
}

class SingleMovie extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movie: {}
      // thumbsUp: 0,
      // thumbsDown: 0,
    }
    // this.onDownvote = this.onDownvote.bind(this)
    // this.onUpvote = this.onUpvote.bind(this)
    this.upVote = this.upVote.bind(this)
  }
  async componentDidMount() {
    this.props.fetchMovie(this.props.match.params.movie)
    // console.log(this.props)
    options.url = `https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/${
      this.props.match.params.movie
    }`
    let response = await axios.request(options)
    try {
      console.log(response.data, 'response in singleMovie component did mount')
      this.setState({
        movie: response.data
        // thumbsUp: this.props.film[0].thumbsUp,
        // thumbsDown: this.props.film[0].thumbsDown,
      })
    } catch (error) {
      console.log('error')
    }
  }

  async upVote() {
    try {
      await axios.put(`/api/movies/${this.props.match.params.movie}/upvote`)
      console.log('it clicked')
      this.props.fetchMovie(this.props.match.params.movie)
      // this.setState({thumbsUp: this.props.film[0].thumbsUp})
    } catch (err) {
      console.log('error in the onClick')
    }
  }

  render() {
    console.log(this.props.film, 'are we getting the state?')
    if (this.props.film.length === 0) {
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
            {/* {/* <button type="button" onClick={this.onUpvote}>
              Vote Up
            </button> */}
            {/* <button type="button" onClick={this.onClick}>
              Test
            </button> */}
            <button type="button" className="thumbs-up" onClick={this.upVote}>
              Thumbs Up{this.props.film[0].thumbsUp}
            </button>
            <button type="button" className="thumbs-down">
              Thumbs Down{this.state.thumbsDown}
            </button>
          </div>
        </div>
      )
  }
}

const mapStateToProps = state => {
  return {
    film: state.movies
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMovie: movie => dispatch(fetchMovie(movie))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SingleMovie)
)
