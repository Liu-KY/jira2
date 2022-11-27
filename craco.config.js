const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "rgb(0, 82, 204)",
              "@font-size-base": "16px",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  devServer: {
    hot: true,
    client: {
      // 只有error时，才产生覆盖层。
      logging: "log",
    },
  },
  // webpack: {
  //   configure: (config, { env, paths }) => {
  //     return config;
  //   },
  // },
};
