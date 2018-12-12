// ref: https://umijs.org/config/
export default {
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: false,
        dva: false,
        dynamicImport: true,
        dll: true,
        hardSource: true
      }
    ]
  ],

  routes: [
    {
      path: '/',
      component: '../main',
      routes: [
        {
          path: '/',
          exact: false,
          component: '../containers/TodoApp'
        }
      ]
    }
  ],

  hash: true,
  alias: {
    '~': `${__dirname}/src`
  },
  cssLoaderOptions: {
    modules: true
  }
};
