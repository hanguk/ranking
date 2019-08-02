const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || 'development'
const config = require('../config/config')[env]
const db = {}

const sequelize = new Sequelize(
  config.database, config.username, config.password, config
)

db.sequelize = sequelize
db.Sequelize = Sequelize
db.Blog = require('./blog')(sequelize, Sequelize)
db.Ranking = require('./ranking')(sequelize, Sequelize)
db.Blog.hasMany(db.Ranking)
db.Ranking.belongsTo(db.Blog)

module.exports = db