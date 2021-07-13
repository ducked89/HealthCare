module.exports = {
  Query: {
    company: async (parent, { id }, { models }) => {
      const company = await models.Companies.findById(id);
      return company;
    },
    companies: async (_, args, { models }) => await models.Companies.find({}),
  },
};
