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
  description: {
    type: Sequelize.TEXT
  }
})

module.exports = Movie
