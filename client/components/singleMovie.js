import React from 'react'

export default class SingleMovie extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log()
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
