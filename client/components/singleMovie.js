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

const thumbUpNum = this.props.film[0].thumbsUp
const thumbDownNum = this.props.film[0].thumbsDown

class SingleMovie extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movie: {},
      thumbsUp: 0,
      thumbsDown: 0
    }
    // this.onDownvote = this.onDownvote.bind(this)
    // this.onUpvote = this.onUpvote.bind(this)
    this.onClick = this.onClick.bind(this)
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
        movie: response.data,
        thumbsUp: thumbUpNum,
        thumbsDown: thumbDownNum
      })
    } catch (error) {
      console.log('error')
    }
  }

  async onClick() {
    // event.preventDefault
    try {
      await axios.get(`/api/movies/${this.props.match.params.movie}`)
      console.log('it clicked')
    } catch (err) {
      console.log('error in the onClick')
    }
  }

  render() {
    console.log(this.props.film, 'are we getting the state?')
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
            {/* {/* <button type="button" onClick={this.onUpvote}>
              Vote Up
            </button> */}
            <button type="button" onClick={this.onClick}>
              Test
            </button>
            <div className="thumbs-up">Thumbs Up{this.state.thumbsUp}</div>
            <div className="thumbs-down">
              Thumbs Down{this.state.thumbsDown}
            </div>
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
