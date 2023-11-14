# INI Simple Parser

A simple, fast and configurable INI parser.

## Install

```sh
npm install --save ini-simple-parser
```

## Usage

The following options are supported:

```ts
type Options = {
  inferBooleans?: boolean, // Interpret true/TRUE/false/FALSE as booleans
  inferNulls?: boolean, // Interpret null/NULL as nulls
  inferNumbers?: boolean, // Interpret some strings that can be parsed as numbers as numbers
  inferStrings?: boolean, // Automatically remove wrapping quotes from strings
  inlineComments?: boolean // Automatically remove inline comments
};
```

This is how you'd use it:

```ts
import parse from 'ini-simple-parser';

// Let's define some initial string to parse

const INPUT = `
  root=true
  notRoot="false"

  ; last modified 1 April 2001 by John Doe
  [owner]
  name=John Doe
  organization=Acme Widgets Inc.

  [database]
  # use IP address in case network name resolution is not working
  server = 192.0.2.62
  port = 143
  file = "payroll.dat"
  extra1 = something ; Inline comment
  extra2 = something else # Inline comment
  null = null
  nil = "0"
`;

// Let's parse it normally, without setting any options

const parsed = parse ( INPUT );
// {
//   root: 'true',
//   notRoot: '"false"',
//   owner: {
//     name: 'John Doe',
//     organization: 'Acme Widgets Inc.'
//   },
//   database: {
//     server: '192.0.2.62',
//     port: '143',
//     file: '"payroll.dat"',
//     extra1: 'something ; Inline comment',
//     extra2: 'something else # Inline comment',
//     null: 'null',
//     nil: '"0"'
//   }
// }

// Let's parse with every option enabled

const parsed = parse ( INPUT, {
  inferBooleans: true,
  inferNulls: true,
  inferNumbers: true,
  inferStrings: true,
  inlineComments: true
});
// {
//   root: true,
//   notRoot: 'false',
//   owner: {
//     name: 'John Doe',
//     organization: 'Acme Widgets Inc.'
//   },
//   database: {
//     server: '192.0.2.62',
//     port: 143,
//     file: 'payroll.dat',
//     extra1: 'something',
//     extra2: 'something else',
//     null: null,
//     nil: '0'
//   }
// }
```

## License

MIT © Fabio Spampinato
