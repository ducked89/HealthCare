const mongoose = require("mongoose");
const { enumArray } = require("../constants");

const settingSchema = new mongoose.Schema(
  {
    companies: [
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
    ],
    author: {
      name: "Code Handler",
      description: `Code Handler is an agency operating in the web trades.
      We offer our services for all types of internet projects: showcase site, tailor-made platform,
      android or IOS smartphone and desktop applications, e-commerce site and marketplace ... We also
      support startups in their development as technical support for realization of their projects:
      marketplace style Airbnb, Uber ... as well as any other innovative project.`,
      email: "codehnd@gmail.com",
      website: "https://www.codehandler.io",
      phone: "(509)4287 2495",
      address: {
        street: "32b, Ave Johnbrown",
        city: "Port-au-Prince",
        postal: "123456",
        state: "OU",
        country: "Haiti",
      },
      socials: {
        youtube: "youtube.com/codehnd",
        facebook: "facebook.com/codehnd",
        twitter: "twitter.com/codehnd",
        instagram: "instagram.com/codehnd",
        linkedin: "linkedin.com/codehnd",
        github: "github.com/codehnd",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Settings", settingSchema);
