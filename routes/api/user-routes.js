const router = require("express").Router();
const { User, Thought } = require("../../models");

// GET all users /api/user
router.get("/", async (req, res) => {
  await User.find({
    // be sure to include user thoughts.
    include: [{ model: Thought }],
  }).then((getAllUsers) => {
    res.json(getAllUsers);
  });
});

// GET a single user by its _id and populated thought and friend data
router.get("/:_id", async (req, res) => {
  try {
    const getUserById = await User.findById({
      _id: req.params._id,
      include: [{ model: User }, { model: Thought }],
    });
    res.status(200).json(getUserById);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST to create a new user: example data --- {  "username": "lernantino"  "email": "lernantino@gmail.com" }
router.post("/", async (req, res) => {
  try {
    const createNewUser = await User.create(req.body);
    createNewUser;
    res.status(200).json(createNewUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT to update a user by its _id
router.put("/:id", async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      req.body,
      { new: true }
    ).select("-__v");
    res.status(200).json(updateUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE to remove user by its _id
// BONUS: Remove a user's associated thoughts when deleted.
router.delete("/:_id", async (req, res) => {
  try {
    const findThoughts = await User.findOne({ _id: req.params._id });
    if (findThoughts.thoughts.length !== 0) {
      const usersThoughts = findThoughts.thoughts;
      usersThoughts.forEach(async (element) => {
        const deleteThoughts = await Thought.deleteOne({
          _id: element._id,
        });
        deleteThoughts;
      });
    }
    const deleteUser = await User.deleteOne({
      _id: req.params._id,
    });
    deleteUser;
    res.status(200).send("user & thoughts have been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

// /api/users/:userId/friends/:friendId
// POST to add a new friend to a user's friend list
router.post("/api/user/:userId/friends/:friendId", async (req, res) => {
  try {
    const addFriend = await User.findOneAndUpdate(
      { _id: req.params._id },
      { $push: { friends: req.params.friendId } },
      { new: true }
    ).select("-__v");

    res.status(200).json(addFriend);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE to remove a friend from a user's friend list
router.delete("/:userId/friends/:friendId", async (req, res) => {
  try {
    const deleteFriend = await User.deleteOne(
      { _id: req.params.id },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    ).select("-__v");
    res.status(200).json(deleteFriend);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
