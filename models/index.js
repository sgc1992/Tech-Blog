const User = require('./User');
const blog = require('./blog');

User.hasMany(blog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

blog.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, blog };
