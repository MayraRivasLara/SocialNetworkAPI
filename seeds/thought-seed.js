const { faker } = require("@faker-js/faker");
const Thought = require("../models/Thought");
const User = require("../models/User");
const getRandomModel = require("./helper-seed");

async function seedThought(numbers) {
  await Thought.deleteMany();

  const thoughts = [];

  for (let index = 0; index < numbers; index++) {
    const randomUser = await getRandomModel(User);

    const created = await Thought.create({
      thought_text: faker.lorem.sentence(10),
      reactions: [
        {
          body: faker.lorem.sentence(3),
          user_id: randomUser._id,
        },
      ],
    });

    await User.findOneAndUpdate(
      {
        _id: randomUser._id,
      },
      {
        $push: {
          thoughts: created._id,
        },
      }
    );

    thoughts.push(created);
  }

  return thoughts;
}

module.exports = seedThought;
