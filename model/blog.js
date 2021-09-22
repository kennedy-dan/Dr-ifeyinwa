const mongoose = require("mongoose");

const blogSchemma = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxLength: [120, "Room name cannot exceed 100 characters"],
    },
    post: { type: mongoose.Schema.Types.Mixed },
    images: [
      {
        public_id: {
          type: String,
          // required: true,
        },
        url: {
          type: String,
          // required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.models.Blog || mongoose.model("Blog", blogSchemma);
