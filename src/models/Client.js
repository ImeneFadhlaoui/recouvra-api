const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
    },
    company: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "blacklisted"],
      default: "active",
    },
    createdBy: {
        type: Schema.Types.ObjectId, ref: 'User'
    }
  },
  { timestamps: true },
);


const Client = mongoose.model('Client',clientSchema)
module.exports= Client;