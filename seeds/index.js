const seedUser = require('./user-seed');
const seedThoughts = require('./thought-seed');
const { User, Thought } = require('../models');
const connection = require('../config/connection');


const seedAll = async () => {
  await seedUser(10);
  console.log("User seeding complete! 🌱");

  await seedThoughts(10);
  console.log("thoughts seeding complete! 🌱");


  process.exit(0);
};

connection.once("open", () => {
  seedAll();
});
