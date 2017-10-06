require('babel-register')({
  presets: ['react', 'es2015'],
  plugins: [
    [
      // We need this to ignore the css when requiring the React app on server
      // for server side rendering
      // @see http://stackoverflow.com/questions/30347722/importing-css-files-in-isomorphic-react-components
      'babel-plugin-transform-require-ignore', { 'extensions': ['.css'] }
    ]
  ]
});
require('babel-polyfill');
require('./server.js');
