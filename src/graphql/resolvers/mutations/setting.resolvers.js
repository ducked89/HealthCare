const { v4 } = require("uuid");
const settings = require("../data");

// const { combineResolvers } = require("graphql-resolvers");

module.exports = {
  Mutation: {
    createCompany: async (parent, { input }, ctx) => {
      input.id = v4();
      const newCompany = { ...input };

      settings[0].companies.push(newCompany);

      return newCompany;
    },
    updateCompany: (parent, { id, input }, ctx) => {
      const indexCompany = settings[0].companies.findIndex(
        (company) => company.id === id
      );
      const company = settings[0].companies[indexCompany];
      settings[0].companies[indexCompany] = { ...company, ...input };

      return settings[0].companies[indexCompany];
    },
    deleteCompany: (parent, { id }, ctx) => {
      const indexComp = settings[0].companies.findIndex(
        (company) => company.id === id
      );

      const removed = settings[0].companies.splice(indexComp, 1);
      return removed;
    },
    resetApp: () => {
      settings.length = 0;
      if (settings.length === 0) return true;
      return false;
    },
  },
};
