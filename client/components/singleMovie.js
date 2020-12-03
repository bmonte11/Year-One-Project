import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {fetchMovie, upVote, downVote} from '../store/movies'
import {FaThumbsUp, FaThumbsDown} from 'react-icons/fa'

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
    }
  }

  downVote() {
    if (this.state.voted === false) {
      this.props.downVote(
        this.props.match.params.movie,
        this.props.match.params.id
      )
      this.setState({voted: true})
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
        {!film ? (
          <div>
            <span className="loader">Loading...</span>
          </div>
        ) : (
          <div className="single-movie">
            <div className="movie-details">
              <div className="single-movie-card">
                <div className="left-side">
                  <img
                    src={
                      film.poster === 'N/A'
                        ? 'https://www.2queue.com/2queue/wp-content/uploads/sites/6/tdomf/4299/movie-poster-coming-soon.png'
                        : film.poster
                    }
                  />
                </div>
                <div className="right-side">
                  <div className="header">
                    <h2>{film.name}</h2>
                    <h4>Dir: {film.director} </h4>
                  </div>
                  <div className="details">
                    <div className="upper-details">
                      <h4>{film.runTime}</h4>
                      <h4> {film.releaseYear}</h4>
                    </div>
                    <div className="lower-details">
                      <span>{film.description}</span>
                      <h4>{film.genre}</h4>
                      <h4>{film.rating}</h4>
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
                </div>
              </div>
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
