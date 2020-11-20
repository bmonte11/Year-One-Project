import React from 'react'
import {connect} from 'react-redux'
import {fetchMovies} from '../store/movies'
import axios from 'axios'
const URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=35db4ef&'

class AllMovies extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input: ''
    }
  }

  async componentDidMount() {
    try {
      const response = await axios.get(URL)
      console.log(response, 'response in component did mount')
    } catch (err) {
      console.log('err')
    }
    // this.props.fetchMovies()
  }

  myChangeHandler(event) {
    this.setState({input: event.target.value})
  }

  render() {
    // console.log(this.props)
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
