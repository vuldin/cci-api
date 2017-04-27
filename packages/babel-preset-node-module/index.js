'use strict'

var path = require('path')

function buildPreset (context, opts) {
  opts = opts || {}

  var plugins = [
    // class { handleClick = () => { } }
    require.resolve('babel-plugin-transform-class-properties'),
    // The following two plugins use Object.assign directly, instead of Babel's
    // extends helper. Note that this assumes `Object.assign` is available.
    // { ...todo, completed: true }
    [
      require.resolve('babel-plugin-transform-object-rest-spread'),
      {
        useBuiltIns: true
      }
    ],
    // Transforms JSX
    [
      require.resolve('babel-plugin-transform-react-jsx'),
      {
        useBuiltIns: true
      }
    ],
    // Polyfills the runtime needed for async/await and generators
    [
      require.resolve('babel-plugin-transform-runtime'),
      {
        helpers: true,
        polyfill: true,
        regenerator: true
      }
    ],
    // const { a, ...z } = obj;
    require.resolve('babel-plugin-transform-es2015-destructuring')
  ]

  // This is similar to how `env` works in Babel:
  // https://babeljs.io/docs/usage/babelrc/#env-option
  // We are not using `env` because it’s ignored in versions > babel-core@6.10.4:
  // https://github.com/babel/babel/issues/4539
  // https://github.com/facebookincubator/create-react-app/issues/720
  // It’s also nice that we can enforce `NODE_ENV` being specified.
  var env = process.env.BABEL_ENV || process.env.NODE_ENV
  if (env !== 'development' && env !== 'test' && env !== 'production') {
    throw new Error(
      'Using `babel-preset-react-app` requires that you specify `NODE_ENV` or ' +
        '`BABEL_ENV` environment variables. Valid values are "development", ' +
        '"test", and "production". Instead, received: ' +
        JSON.stringify(env) +
        '.'
    )
  }

  if (env === 'development' || env === 'test') {
    // The following two plugins are currently necessary to make React warnings
    // include more valuable information. They are included here because they are
    // currently not enabled in babel-preset-react. See the below threads for more info:
    // https://github.com/babel/babel/issues/4702
    // https://github.com/babel/babel/pull/3540#issuecomment-228673661
    // https://github.com/facebookincubator/create-react-app/issues/989
    plugins.push([
      // Adds component stack to warning messages
      require.resolve('babel-plugin-transform-react-jsx-source'),
      // Adds __self attribute to JSX which React will use for some warnings
      require.resolve('babel-plugin-transform-react-jsx-self')
    ])
  }

  if (env === 'development' || env === 'test') {
    return {
      presets: [
        // ES features necessary for user's Node version
        [
          require('babel-preset-env').default,
          Object.assign({}, opts, {
            targets: opts.targets || {
              node: 'current'
            },
            useBuiltIns: true
          })
        ],
        // JSX, Flow
        require.resolve('babel-preset-react')
      ],
      plugins: plugins
    }
  }

  return {
    presets: [
      // Latest stable ECMAScript features
      require.resolve('babel-preset-latest'),
      // JSX, Flow
      require.resolve('babel-preset-react')
    ],
    plugins: plugins.concat([
      // function* () { yield 42; yield 43; }
      [
        require.resolve('babel-plugin-transform-regenerator'),
        {
          // Async functions are converted to generators by babel-preset-latest
          async: false
        }
      ]
    ])
  }
}

module.exports = buildPreset
