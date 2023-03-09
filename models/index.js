const { Show } = require('./Show')
const { User } = require('./User')

Show.belongsTo(User)
User.hasMany(Show)

User.belongsToMany(Show, { through: 'WatchedShows' });
Show.belongsToMany(User, { through: 'WatchedShows' });

module.exports = {Show, User}
