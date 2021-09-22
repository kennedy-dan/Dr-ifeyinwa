const mongoose = require("mongoose");

const coursesSchemma = new mongoose.Schema(
  {
    courseCode: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    note: { type: mongoose.Schema.Types.Mixed },
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
    date: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Courses || mongoose.model("Courses", coursesSchemma);

