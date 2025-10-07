const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  sortid: {
    type: String,
    required: true,
    unique: true,
  },
  redirecturl: {
    type: String,
    required: true,
  },
  visithistory: [
    {
      timestamp: { type: Number },
    },
  ],
});

module.exports = mongoose.model("URL", urlSchema);
