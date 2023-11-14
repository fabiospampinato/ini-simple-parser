
/* IMPORT */

import benchmark from 'benchloop';
import parse from '../dist/index.js';
import {INPUT} from '../test/fixtures.js';

/* MAIN */

benchmark.config ({
  iterations: 100_000
});

benchmark ({
  name: 'parse',
  fn: () => {
    parse ( INPUT );
  }
});

benchmark ({
  name: 'parse.infer',
  fn: () => {
    parse ( INPUT, { inferBooleans: true, inferNulls: true, inferNumbers: true, inferStrings: true } );
  }
});

benchmark.summary ();
