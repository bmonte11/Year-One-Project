import React from 'react'

export default class Movies extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input: ''
    }
    this.myChangeHandler = this.myChangeHandler.bind(this)
  }
  myChangeHandler(event) {
    this.setState({input: event.target.value})
  }
  render() {
    console.log(this.state.input)
    return (
      <div>
        <h1>This is a page where you can search movies!</h1>
        <form>
          <input
            type="text"
            onChange={this.myChangeHandler}
            value={this.state.input}
          />
        </form>
      </div>
    )
  }
}
