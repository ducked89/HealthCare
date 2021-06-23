const settings = require("../data");

module.exports = {
  Query: {
    settings: () => settings,
    company: (parent, { id }, ctx, info) => {
      const setting = settings.find((sett) => {
        const comp = sett.companies.filter((company) => id === company.id);
        return comp;
      });
      return setting.companies.find((comp) => comp.id === id);
    },
    companies: () => {
      const obj = settings.find((sett) => {
        return sett.companies;
      });
      return obj.companies;
    },
  },
};
