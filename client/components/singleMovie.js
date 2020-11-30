import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {fetchMovie} from '../store/movies'
import {FaThumbsUp, FaThumbsDown} from 'react-icons/fa'

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
      movie: {},
      voted: false
    }
    this.downVote = this.downVote.bind(this)
    this.upVote = this.upVote.bind(this)
    this.back = this.back.bind(this)
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
    if (this.state.voted === false) {
      try {
        await axios.put(`/api/movies/${this.props.match.params.movie}/upvote`)
        this.setState({voted: true})
        this.props.fetchMovie(this.props.match.params.movie)
      } catch (err) {
        console.log('error in the onClick')
      }
    }
  }

  async downVote() {
    if (this.state.voted === false) {
      try {
        await axios.put(`/api/movies/${this.props.match.params.movie}/downvote`)
        this.setState({voted: true})
        this.props.fetchMovie(this.props.match.params.movie)
      } catch (err) {
        console.log('error in the onClick')
      }
    }
  }

  back() {
    this.props.history.goBack()
  }

  render() {
    return (
      <div>
        <button type="button" className="button icon-left" onClick={this.back}>
          Back
        </button>
        {!this.state.movie.Title ? (
          <div>
            <span>Loading...</span>
          </div>
        ) : (
          <div className="single-movie">
            <div className="movie-details">
              <div className="header">
                <h2>{this.state.movie.Title}</h2>
                <img src={this.state.movie.Poster} />
              </div>
              <div className="details">
                <div>Description: {this.state.movie.Plot}</div>
                <div>Release Year: {this.state.movie.Year}</div>
                <div>Director: {this.state.movie.Director} </div>
              </div>
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
