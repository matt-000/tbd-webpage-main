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
    "spaced-comment": "off",
    "import/unambiguous": "off",
    "import/extensions": "off",
    "no-negated-condition": "off",
    "global-require": "off",
    "no-trailing-spaces": "off",
    "keyword-spacing": "off",
    "space-before-function-paren": "off",
    "comma-dangle": "off",
    "comma-spacing": "off",
    "space-before-blocks": "off",
    "no-alert": "off",
    '@typescript-eslint/no-unused-vars':'off',
    "import/no-useless-path-segments":'off',
    "no-multi-spaces":'off',
    "no-multiple-empty-lines":'off',
    "no-tabs":"off",
    "import/no-duplicates":"off",
    "no-duplicate-imports":"off",
    "object-curly-spacing":"off",
    "key-spacing":"off",
    "lines-around-comment":"off",
    "prefer-const":"off",
    "no-mixed-spaces-and-tabs":"off",
    "jsx-quotes":"off",
    "prefer-template":"off",
    "import/no-unresolved":"off",
    "camelcase":"off",
    "no-use-before-define":"off",
    "no-eq-null":"off",
    "no-undef":"off",
    "linebreak-style": "off",
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