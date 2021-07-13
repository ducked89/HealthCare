module.exports = {
  Mutation: {
    resetApp: async () => {
      return true; //(await connectDb.dropDatabase()) ?? true;
    },
  },
};
