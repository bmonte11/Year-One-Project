import React from 'react'
import {connect} from 'react-redux'
import {fetchMovies} from '../store/movies'

class AllMovies extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input: ''
    }
  }

  componentDidMount() {
    this.props.fetchMovies()
  }

  myChangeHandler(event) {
    this.setState({input: event.target.value})
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <h1>Here are all the movies</h1>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    getMovies: () => dispatch(fetchMovies())
  }
}

export default connect(null, mapDispatch)(AllMovies)
