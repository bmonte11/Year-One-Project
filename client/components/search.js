import React from 'react'
import axios from 'axios'

let movie

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

  onSubmit(event) {
    event.preventDefault()
    fetch(`http://www.omdbapi.com/?t=${this.state.input}&apikey=35db4ef`)
      .then(resp => resp.json())
      .then(data => this.setState({movie: data, clicked: true}))
    // console.log(response, 'response in component did mount')
    // this.props.history.push('/movies')
  }
  render() {
    console.log(this.state.movie)
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
          {this.state.clicked && (
            <div className="movie info">
              This is displaying if there's a movie
            </div>
          )}
        </form>
      </div>
    )
  }
}
