const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: "gabriel",
        mongodb_password: "gabriel",
        mongodb_cluster: "cluster0",
        mongodb_database: "my-site-dev",
      },
    };
  }

  // could set up a different config for production here
  return {
    env: {
      mongodb_username: "gabriel",
      mongodb_password: "gabriel",
      mongodb_cluster: "cluster0",
      mongodb_database: "my-site",
    },
  };
};
