const mongoose = require("mongoose");
const { enumArray } = require("../../constants");

const settingSchema = new mongoose.Schema(
  {
    companies: [{ type: mongoose.Types.ObjectId, ref: "Companies" }],
    author: {
      name: { type: String, default: "Code Handler" },
      description: {
        type: String,
        default: `Code Handler is an agency operating in the web trades.
      We offer our services for all types of internet projects: showcase site, tailor-made platform,
      android or IOS smartphone and desktop applications, e-commerce site and marketplace ... We also
      support startups in their development as technical support for realization of their projects:
      marketplace style Airbnb, Uber ... as well as any other innovative project.`,
      },
      email: { type: String, default: "codehnd@gmail.com" },
      website: { type: String, default: "https://www.codehandler.io" },
      phone: { type: String, default: "(509)4287 2495" },
      address: {
        street: { type: String, default: "32b, Ave Johnbrown" },
        city: { type: String, default: "Port-au-Prince" },
        postal: { type: String, default: "123456" },
        state: { type: String, default: "OU" },
        country: { type: String, default: "Haiti" },
      },
      socials: {
        youtube: { type: String, default: "youtube.com/codehnd" },
        facebook: { type: String, default: "facebook.com/codehnd" },
        twitter: { type: String, default: "twitter.com/codehnd" },
        instagram: { type: String, default: "instagram.com/codehnd" },
        linkedin: { type: String, default: "linkedin.com/codehnd" },
        github: { type: String, default: "github.com/codehnd" },
      },
    },
  },
  { timestamps: true }
);

settingSchema.pre("save", function (next) {
  let self = this;
  Settings.find({}, function (err, document) {
    if (document.length > 0) {
      next(
        new Error(
          "The resource you are looking for might have been removed or temporarily unavailable."
        )
      );
    } else {
      next();
    }
  });
});

const Settings = mongoose.model("settings", settingSchema);

module.exports = Settings;
