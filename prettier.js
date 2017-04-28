const prettier = require('prettier')
const shell = require('shelljs')
const forOwn = require('lodash/forOwn')
const kebabCase = require('lodash/kebabCase')

const source = process.cwd() + '/**/*.js'

const opts = {
  // Indent lines with tabs
  useTabs: false,

  // Fit code within this line limit
  printWidth: 80,

  // Number of spaces it should use per tab
  tabWidth: 2,

  // If true, will use single instead of double quotes
  singleQuote: true,

  // Controls the printing of trailing commas wherever possible. Valid options:
  // "none" - No trailing commas
  // "es5"  - Trailing commas where valid in ES5 (objects, arrays, etc)
  // "all"  - Trailing commas wherever possible (function arguments)
  //
  // NOTE: Above is only available in 0.19.0 and above. Previously this was
  // a boolean argument.
  trailingComma: 'es5',

  // Controls the printing of spaces inside object literals
  bracketSpacing: true,

  // If true, puts the `>` of a multi-line jsx element at the end of
  // the last line instead of being alone on the next line
  jsxBracketSameLine: false,

  // Which parser to use. Valid options are "flow" and "babylon"
  parser: 'babylon',

  // Whether to add a semicolon at the end of every line (semi: true),
  // or only at the beginning of lines that may introduce ASI failures (semi: false)
  semi: false,
}

let command = 'prettier '
forOwn(opts, (v, k) => command += `--${kebabCase(k)} ${v} `)
command += `--write "${source}"`

shell.exec(command, (code, stdout, stderr) => {
  console.log(code)
  console.log(stdout)
  console.log(stderr)
})

//prettier --single-quote --trailing-comma es5 --write "{app,__{tests,mocks}__}/**/*.js"
