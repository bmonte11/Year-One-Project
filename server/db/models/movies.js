const Sequelize = require('sequelize')
const db = require('../db')

const Movie = db.define('movie', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  director: {
    type: Sequelize.STRING
  },
  releaseYear: {
    type: Sequelize.INTEGER
  },
  thumbsUp: {
    type: Sequelize.INTEGER
  },
  thumbsDown: {
    type: Sequelize.INTEGER
  }
})

module.exports = Movie
