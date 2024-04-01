const mongoose = require("mongoose");

const urlSchema = mongoose.Schema(
  {
    redirectedUrl: {
      type: String,
      required: true,
    },
    shortId: {
      type: String,
      required: true,
    },
    clicks: {
      type: Number,
      required: true,
      default: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

const URL = mongoose.model("url", urlSchema);

module.exports = URL;
