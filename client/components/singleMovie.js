import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {fetchMovie} from '../store/movies'
import {FaThumbsUp, FaThumbsDown} from 'react-icons/fa'
import ReactPlayer from 'react-player'

// const options = {
//   method: 'GET',
//   url: 'https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/',
//   headers: {
//     'x-rapidapi-key': 'fd7b15974cmsh8a07e9234699e3cp16b971jsnd504ba3dbbbb',
//     'x-rapidapi-host': 'imdb-internet-movie-database-unofficial.p.rapidapi.com'
//   }
// }

const options = {
  method: 'GET',
  url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
  params: {i: 'tt4154796', r: 'json'},
  headers: {
    'x-rapidapi-key': 'fd7b15974cmsh8a07e9234699e3cp16b971jsnd504ba3dbbbb',
    'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com'
  }
}

class SingleMovie extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movie: {}
    }
    this.downVote = this.downVote.bind(this)
    this.upVote = this.upVote.bind(this)
  }
  async componentDidMount() {
    this.props.fetchMovie(this.props.match.params.movie)
    options.params.i = this.props.match.params.id
    let response = await axios.request(options)
    try {
      console.log(response.data, 'response in singleMovie component did mount')
      this.setState({
        movie: response.data
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
    } catch (err) {
      console.log('error in the onClick')
    }
  }

  async downVote() {
    try {
      await axios.put(`/api/movies/${this.props.match.params.movie}/downvote`)
      console.log('it clicked')
      this.props.fetchMovie(this.props.match.params.movie)
    } catch (err) {
      console.log('error in the onClick')
    }
  }

  render() {
    return (
      <div className="single-movie">
        {!this.state.movie.Title ? (
          <div>
            <span>Loading...</span>
          </div>
        ) : (
          <div>
            <div className="header">
              {this.state.movie.Title}
              <img src={this.state.movie.Poster} />
            </div>
            <div className="details">
              <div>Description: {this.state.movie.Plot}</div>
              <div>Release Year: {this.state.movie.Year}</div>
              <div>Director: {this.state.movie.Director} </div>
              {/* <ReactPlayer url={this.state.movie.trailer.link} /> */}
            </div>
            <div className="thumb-area">
              <FaThumbsUp
                className="thumb"
                // value={{color: 'blue', className: 'thumb'}}
                onClick={this.upVote}
              />
              {this.props.film[0].thumbsUp}
              <FaThumbsDown
                className="thumb"
                // value={{color: 'blue', className: 'thumb'}}
                onClick={this.downVote}
              />
              {this.props.film[0].thumbsDown}
            </div>
          </div>
        )}
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
