const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  created_by: {
    type: String,
    required: true,
  },

  created_at: {
    type: Date,
    default: Date.now(),
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  private: {
    type: Boolean,
    default: true,
    required: true,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
});

module.exports = mongoose.model("Blogs", blogSchema);
