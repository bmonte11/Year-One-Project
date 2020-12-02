import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {fetchMovie, upVote, downVote} from '../store/movies'
import {FaThumbsUp, FaThumbsDown} from 'react-icons/fa'
import e from 'express'

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
  componentDidMount() {
    this.props.fetchMovie(
      this.props.match.params.movie,
      this.props.match.params.id
    )
  }

  upVote() {
    if (this.state.voted === false) {
      this.props.upVote(
        this.props.match.params.movie,
        this.props.match.params.id
      )
      this.setState({voted: true})
      // this.props.fetchMovie(
      //   this.props.match.params.movie,
      //   this.props.match.params.id
      // )
    }
  }

  downVote() {
    if (this.state.voted === false) {
      this.props.downVote(
        this.props.match.params.movie,
        this.props.match.params.id
      )
      this.setState({voted: true})
      // this.props.fetchMovie(
      //   this.props.match.params.movie,
      //   this.props.match.params.id
      // )
    }
  }

  back() {
    this.props.history.goBack()
  }

  render() {
    const film = this.props.film[0]
    return (
      <div className="page">
        <button type="button" className="button icon-left" onClick={this.back}>
          Back
        </button>
        {!film.id ? (
          <div>
            <span className="loader">Loading...</span>
          </div>
        ) : (
          <div className="single-movie">
            <div className="movie-details">
              <div className="header">
                <h2>{film.name}</h2>
                <img
                  src={
                    film.poster === 'N/A'
                      ? 'https://www.2queue.com/2queue/wp-content/uploads/sites/6/tdomf/4299/movie-poster-coming-soon.png'
                      : film.poster
                  }
                />
              </div>
              <div className="details">
                <div>Description: {film.description}</div>
                <div>Release Year: {film.releaseYear}</div>
                <div>Director: {film.director} </div>
              </div>
            </div>
            <div className="thumb-area">
              <FaThumbsUp
                className="thumb"
                // value={{color: 'blue', className: 'thumb'}}
                onClick={this.upVote}
              />
              {film.thumbsUp}
              <FaThumbsDown
                className="thumb"
                // value={{color: 'blue', className: 'thumb'}}
                onClick={this.downVote}
              />
              {film.thumbsDown}
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    film: state.movies.film
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMovie: (movie, id) => dispatch(fetchMovie(movie, id)),
    upVote: (movie, id) => dispatch(upVote(movie, id)),
    downVote: (movie, id) => dispatch(downVote(movie, id))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SingleMovie)
)
