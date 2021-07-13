const mongoose = require("mongoose");
const { enumArray } = require("../../constants");

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    title: {
      type: String,
      unique: true,
      required: true,
    },
    businessId: {
      type: String,
      unique: true,
      required: true,
    },
    businessType: {
      type: String,
      required: true,
    },
    logo: String,
    industry: String,
    contact: String,
    email: String,
    phone: String,
    website: String,
    parent: { type: mongoose.Types.ObjectId, ref: "Companies" },
    children: [{ type: mongoose.Types.ObjectId, ref: "Companies" }],
    address: {
      street: String,
      city: String,
      postal: String,
      state: String,
      country: String,
    },
    status: {
      type: String,
      enum: enumArray.status.value,
      default: enumArray.status.default,
    },
  },
  { timestamps: true }
);

const Companies = mongoose.model("companies", companySchema);

module.exports = Companies;
