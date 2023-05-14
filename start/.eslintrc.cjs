module.exports={
  root:true,
  parserOptions:{
    'ecmaVersion':2017,
    'ecmaFeatures':{
      'experimentalObjectRestSpread':true,
      'impliedStrict':true,
      'modules':true,
      'blockBindings':true,
      'arrowFunctions':true,
      'objectLiteralShorthandMethods':true,
      'objectLiteralShorthandProperties':true,
      'templateStrings':true,
      'classes':true,
      "sourceType":"module"
    },
  },

  settings:{
    'import/resolver':{
      node:{
        extensions:['.mjs', '.js', '.json', '.ts', '.tsx']
      }
    },
    'import/extensions':[
      '.js',
      '.mjs',
      '.jsx',
      '.ts',
      '.tsx'
    ],
    'import/core-modules':[
    ],
    'import/ignore':[
      'node_modules',
      '\\.(coffee|scss|css|less|hbs|svg|json)$',
    ],
  },
  
  rules:{
    'quotes':'off',
    "semi":"off",
    'import/no-unassigned-import':'off',
    'eol-last':'off',
    "no-unused-vars": "off",
    "indent":"off",
    "comma-dangle":["error", "never"],
    '@typescript-eslint/no-unused-vars':'off',
    "import/no-useless-path-segments":'off',
    'import/extensions':['error', 'ignorePackages',{
      'js':'never',
      'jsx':'never',
      'ts':'never',
      'tsx':'never',
      'allowImportingTsExtensions':true
    }]
  },

  env:{
    'browser':true,
  },

  plugins:[
    'json',
  ],

  extends:[
    '@metamask/eslint-config',
    '@metamask/eslint-config/config/nodejs',
  ],
  
  globals:{
    'web3':true,
  },
}