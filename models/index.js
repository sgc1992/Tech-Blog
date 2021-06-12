const User = require('./User');
const blog = require('./blog');
const comment = require('./Comment');

User.hasMany(blog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

blog.belongsTo(User, {
  foreignKey: 'user_id',
});

blog.hasMany(comment, {
  foreignKey: 'blog_id',
  onDelete: 'CASCADE',
});

module.exports = { User, blog, comment };
