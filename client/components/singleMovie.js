import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {fetchMovie} from '../store/movies'
import {FaThumbsUp, FaThumbsDown} from 'react-icons/fa'

// const options = {
//   method: 'GET',
//   url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
//   params: {i: 'tt4154796', r: 'json'},
//   headers: {
//     'x-rapidapi-key': 'fd7b15974cmsh8a07e9234699e3cp16b971jsnd504ba3dbbbb',
//     'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com',
//   },
// }

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
    //   options.params.i = this.props.match.params.id
    //   let response = await axios.request(options)
    //   try {
    //     console.log(response.data, 'response in singleMovie component did mount')
    //     this.setState({
    //       movie: response.data,
    //     })
    //   } catch (error) {
    //     console.log('error')
    //   }
  }

  async upVote() {
    if (this.state.voted === false) {
      try {
        await axios.put(
          `/api/movies/${this.props.match.params.movie}/${
            this.props.match.params.id
          }/upvote`
        )
        this.setState({voted: true})
        this.props.fetchMovie(
          this.props.match.params.movie,
          this.props.match.params.id
        )
      } catch (err) {
        console.log('error in the onClick')
      }
    }
  }

  async downVote() {
    if (this.state.voted === false) {
      try {
        await axios.put(
          `/api/movies/${this.props.match.params.movie}/${
            this.props.match.params.id
          }/downvote`
        )
        this.setState({voted: true})
        this.props.fetchMovie(
          this.props.match.params.movie,
          this.props.match.params.id
        )
      } catch (err) {
        console.log('error in the onClick')
      }
    }
  }

  back() {
    this.props.history.goBack()
  }

  render() {
    const film = this.props.film[0]
    console.log(film, 'singleMovie film')
    return (
      <div>
        <button type="button" className="button icon-left" onClick={this.back}>
          Back
        </button>
        {!film ? (
          <div>
            <span>Loading...</span>
          </div>
        ) : (
          <div className="single-movie">
            <div className="movie-details">
              <div className="header">
                <h2>{film.name}</h2>
                <img src={film.poster} />
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
    fetchMovie: (movie, id) => dispatch(fetchMovie(movie, id))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SingleMovie)
)
