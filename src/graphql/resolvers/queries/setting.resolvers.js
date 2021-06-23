const settings = require("../data");

module.exports = {
  Query: {
    settings: () => settings,
    company: (parent, { id }, ctx, info) =>
      settings.companies.find((company) => id === company.id),
    companies: () => settings.companies,
  },
};
