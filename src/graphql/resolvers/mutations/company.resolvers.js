const { v4 } = require("uuid");
// const { combineResolvers } = require("graphql-resolvers");

module.exports = {
  Mutation: {
    createCompany: async (parent, { input }, { models }) => {
      input.businessId = v4();
      try {
        const findSetting = await models.Settings.findOne({});

        const newCompany = await new models.Companies(input);
        await newCompany.save();

        if (!findSetting && findSetting === null) {
          const companies = [newCompany.id];
          const newSetting = await new models.Settings({ companies });
          await newSetting.save();
        } else {
          await models.Settings.findByIdAndUpdate(
            findSetting.id,
            {
              $push: { companies: [newCompany.id] },
            },
            { new: true }
          );
        }
        return newCompany;
      } catch (error) {
        console.error(error);
        return [];
      }
    },
    updateCompany: async (parent, { id, input }, { models }) => {
      try {
        const updatedCompany = await models.Companies.findByIdAndUpdate(
          id,
          input,
          {
            new: true,
          }
        );
        return updatedCompany;
      } catch (error) {
        console.log(error);
        return;
      }
    },
    deleteCompany: async (_, { id }, { models }) => {
      try {
        const findSetting = await models.Settings.findOne({});
        await models.Settings.findByIdAndUpdate(
          findSetting.id,
          {
            $pull: { companies: { $in: [id] } },
          },
          { new: true }
        );
        const deletedCompany = await models.Companies.findByIdAndDelete(id);

        return deletedCompany;
      } catch (err) {
        return [{ error: err.message }];
      }
    },
    addParent: async (_, { parent, child }, { models }) => {
      const top = await models.Companies.findByIdAndUpdate(
        parent,
        {
          $push: { children: [child] },
        },
        {
          new: true,
        }
      );
      const bottom = await models.Companies.findByIdAndUpdate(
        child,
        {
          $set: { parent },
        },
        {
          new: true,
        }
      );
      if (top && bottom) return true;
      return false;
    },
    removeParent: async (_, { parent, child }, { models }) => {
      const top = await models.Companies.findByIdAndUpdate(
        parent,
        {
          $pull: { children: { $in: [child] } },
        },
        {
          new: true,
        }
      );
      const bottom = await models.Companies.findByIdAndUpdate(
        child,
        {
          $set: { parent: null },
        },
        {
          new: true,
        }
      );
      if (top && bottom) return true;
      return false;
    },
  },
};
