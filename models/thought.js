const { Schema, model } = require("mongoose");

// Schema to create a reaction model
const reactionSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
      max: 280,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    id: true,
  }
);

// Schema to create thought model
const thoughtSchema = new Schema(
  {
    thought_text: {
      type: String,
      required: true,
      min: 1,
      max: 280,
    },

    reactions: [reactionSchema],
  },
  {
    timestamps: true,
    id: true,
  }
);


thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
