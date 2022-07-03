'use strict';
const fs = require('fs');
const path = require('path');
const invariant = require('tiny-invariant');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const rootDir = fs.realpathSync(path.resolve(__dirname, '../../'));

const resolvePath = (relativePath) => {
  invariant(
    typeof relativePath === 'string',
    'Relative path has to be a string'
  );

  return path.resolve(rootDir, relativePath);
};

const paths = {
  srcDir: resolvePath('./src'),
  publicDir: resolvePath('./public'),
  scriptsDir: resolvePath('./scripts'),
  rootDir,
  packageJson: resolvePath('./package.json'),
  distDir: resolvePath('./dist'),
  templatesDir: resolvePath('./scripts/templates'),
  postCategories: resolvePath('./post-categories.json'),
  blogPostsDir: resolvePath('./src/pages/blog/post'),
};

module.exports = paths;
