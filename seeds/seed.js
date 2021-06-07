const sequelize = require('../config/connection');
const { User, blog } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');

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

  process.exit(0);
};

seedDatabase();
