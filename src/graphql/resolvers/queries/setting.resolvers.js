module.exports = {
  Query: {
    settings: async (_, args, { models }) => await models.Settings.find({}),
  },
  Setting: {
    companies: async (parent, args, { models }) => {
      const companies = await models.Companies.find({
        _id: { $in: parent.companies },
      });
      return companies;
    },
  },
};
