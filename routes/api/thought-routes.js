const router = require("express").Router();
const { User, Thought } = require("../../models");
const { create } = require("../../models/User");

// /api/thought
// GET to get all thoughts
router.get("/", async (req, res) => {
  await Thought.find({
    include: [{ model: User }],
  }).then((getAllThoughts) => {
    res.json(getAllThoughts);
  });
});

// GET to get a single thought by its _id
router.get("/:_id", async (req, res) => {
  try {
    const getThoughtById = await Thought.findById({
      _id: req.params._id,
      include: [{ model: Thought }, { model: User }],
    });
    res.status(200).json(getThoughtById);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST to create a new thought + push the created thought to the associated user
// example data: { "thoughtText": "Here's a cool thought...", "username": "lernantino", "userId": "5edff358a0fcb779aa7b118b" }
router.post("/", async (req, res) => {
  try {
    const createNewThought = await Thought.create(req.body);
    const addToUser = await User.findOneAndUpdate(
      { _id: req.body.user_id },
      { $addToSet: { thought_text: createNewThought } },
      { new: true }
    )

    res.status(200).json(createNewThought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// PUT to update a thought by its _id
router.put("/:id", async (req, res) => {
  try {
    const updateThought = await Thought.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      req.body,
      { new: true }
    )
    res.status(200).json(updateThought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE to remove a thought by its _id
router.delete("/:_id", async (req, res) => {
  try {
    const deleteOneThought = await Thought.findOneAndDelete({
      _id: req.params._id,
    });
   res.status(200).json(deleteOneThought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// /api/thoughts/:thoughtId/reactions
// POST to create a reaction stored in a single thought's reactions array field
router.post("/:thoughtId/reactions", async (req, res) => {
  try {
    const createReaction = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true }
    );
    res.status(200).json(createReaction);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE to pull and remove a reaction by the reaction's reactionId value
router.delete("/:thoughtId/reactions", async (req, res) => {
  try {
    const deleteReaction = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: req.body } },
      { new: true }
    );
    
    res.status(200).json(deleteReaction);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
