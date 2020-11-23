import React from 'react'
import axios from 'axios'

const options = {
  method: 'GET',
  url: 'https://imdb-internet-movie-database-unofficial.p.rapidapi.com/search/',
  headers: {
    'x-rapidapi-key': 'fd7b15974cmsh8a07e9234699e3cp16b971jsnd504ba3dbbbb',
    'x-rapidapi-host': 'imdb-internet-movie-database-unofficial.p.rapidapi.com'
  }
}

export default class SingleMovie extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movie: {}
    }
  }
  async componentDidMount() {
    // options.url = `https://imdb-internet-movie-database-unofficial.p.rapidapi.com/search/${this.state.input}`
    let response = await axios.request(options)
    try {
      console.log(response.data, 'response in onSubmit')
      this.setState({movie: response.data})
    } catch (error) {
      console.log('error')
    }
  }
  render() {
    console.log(this.state.movie, 'movie in the single Movie component')
    return (
      <div>
        <h1>This is a single Movie page!</h1>
      </div>
    )
  }
}
