
/* MAIN */

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

const OUTPUT = {
  root: 'true',
  notRoot: '"false"',
  owner: {
    name: 'John Doe',
    organization: 'Acme Widgets Inc.'
  },
  database: {
    server: '192.0.2.62',
    port: '143',
    file: '"payroll.dat"',
    extra1: 'something ; Inline comment',
    extra2: 'something else # Inline comment',
    null: 'null',
    nil: '"0"'
  }
};

const OUTPUT_INFER = {
  root: true,
  notRoot: 'false',
  owner: {
    name: 'John Doe',
    organization: 'Acme Widgets Inc.'
  },
  database: {
    server: '192.0.2.62',
    port: 143,
    file: 'payroll.dat',
    extra1: 'something',
    extra2: 'something else',
    null: null,
    nil: '0'
  }
};

/* EXPORT */

export {INPUT, OUTPUT, OUTPUT_INFER};
