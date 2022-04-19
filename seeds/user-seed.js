const User = require("../models/user");
const { faker } = require("@faker-js/faker");

async function seedUser(numbers) {
  await User.deleteMany();

  const users = [];

  for (let index = 0; index < numbers; index++) {
    const [firstName, lastName] = [
      faker.name.firstName(),
      faker.name.lastName(),
    ];

    const created = await User.create({
      username: faker.internet.userName(firstName, lastName),
      email: faker.internet.email(firstName, lastName),
      // thoughts:
      // friends:
    });

    users.push(created);
  }

  return users;
}

module.exports = seedUser;
