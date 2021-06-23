const { v4 } = require("uuid");
const settings = require("../data");

// const { combineResolvers } = require("graphql-resolvers");

module.exports = {
  Mutation: {
    createCompany: async (parent, { input }, ctx) => {
      input.id = v4();
      const newCompany = { ...input };

      settings.companies.push(newCompany);

      return newCompany;
    },
    updateCompany: (parent, { id, input }, ctx) => {
      const indexCompany = settings.companies.findIndex(
        (company) => company.id === id
      );
      const company = settings.companies[indexCompany];
      settings.companies[indexCompany] = { ...company, ...input };

      return settings.companies[indexCompany];
    },
    deleteCompany: (parent, { id }, ctx) => {
      const indexComp = settings.companies.findIndex(
        (company) => company.id === id
      );

      const removed = settings.companies.splice(indexComp, 1);
      return removed;
    },
  },
};
