const User = require('./User');
const blog = require('./blog');
const comment = require('./comment');

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

comment.belongsTo(blog, {
  foreignKey: 'blog_id',
});

module.exports = { User, blog, comment };
