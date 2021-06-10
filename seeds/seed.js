const sequelize = require('../config/connection');
const { User,Comment, blog } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const blogA of blogData) {
    await blog.create({
      ...blogA,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
  const comments = await Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
