const seedUser = require("./user-seed");
const connection = require("../config/connection");
// const { User, Thought } = require("../models");

const seedAll = async () => {
  await seedUser(10);
  console.log("User seeding complete! 🌱");

  process.exit(0);
};

connection.once("open", () => {
  seedAll();
});
