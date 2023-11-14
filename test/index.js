
/* IMPORT */

import {describe} from 'fava';
import parse from '../dist/index.js';
import {INPUT, OUTPUT, OUTPUT_INFER} from './fixtures.js';

/* MAIN */

describe ( 'INI Simple Parser', it => {

  it ( 'supports a BOM character', t => {

    const output = parse ( '\ufeff' );

    t.deepEqual ( output, {} );

  });

  it ( 'supports empty lines', t => {

    const output = parse ( '\n  \n\t\n' );

    t.deepEqual ( output, {} );

  });

  it ( 'supports comments lines', t => {

    const output1 = parse ( '; comment' );
    const output2 = parse ( '# comment' );

    t.deepEqual ( output1, {} );
    t.deepEqual ( output2, {} );

  });

  it ( 'supports properties lines', t => {

    const output = parse ( 'one=uno\n  two  \t=\t  due' );

    t.deepEqual ( output, { one: 'uno', two: 'due' } );

  });

  it ( 'supports empty sections', t => {

    const output1 = parse ( '[]' );
    const output2 = parse ( '[section]' );
    const output3 = parse ( '[foo bar baz]' );
    const output4 = parse ( '[[!foo]]' );

    t.deepEqual ( output1, { '': {} } );
    t.deepEqual ( output2, { 'section': {} } );
    t.deepEqual ( output3, { 'foo bar baz': {} } );
    t.deepEqual ( output4, { '[!foo]': {} } );

  });

  it ( 'supports full sections', t => {

    const output1 = parse ( '[section]\none=uno' );
    const output2 = parse ( '[section]\n  one  \t=\t  uno' );
    const output3 = parse ( '[section]\none=uno\none=une' );

    t.deepEqual ( output1, { 'section': { one: 'uno' } } );
    t.deepEqual ( output2, { 'section': { one: 'uno' } } );
    t.deepEqual ( output3, { 'section': { one: 'une' } } );

  });

  it ( 'supports optionally inferring booleans', t => {

    const output1 = parse ( 'one=true\ntwo=TRUE', { inferBooleans: true } );
    const output2 = parse ( 'one=false\ntwo=FALSE', { inferBooleans: true } );
    const output3 = parse ( 'one="true"\ntwo="TRUE"', { inferBooleans: true, inferStrings: true } );
    const output4 = parse ( 'one="false"\ntwo="FALSE"', { inferBooleans: true, inferStrings: true } );

    t.deepEqual ( output1, { one: true, two: true } );
    t.deepEqual ( output2, { one: false, two: false } );
    t.deepEqual ( output3, { one: 'true', two: 'TRUE' } );
    t.deepEqual ( output4, { one: 'false', two: 'FALSE' } );

  });

  it ( 'supports optionally inferring nulls', t => {

    const output1 = parse ( 'one=null\ntwo=NULL', { inferNulls: true } );
    const output2 = parse ( 'one="null"\ntwo="NULL"', { inferNulls: true, inferStrings: true } );

    t.deepEqual ( output1, { one: null, two: null } );
    t.deepEqual ( output2, { one: 'null', two: 'NULL' } );

  });

  it ( 'supports optionally inferring numbers', t => {

    const output1 = parse ( 'one=0\ntwo=-123\nthree=.123\nfour=-12e-10', { inferNumbers: true } );
    // const output2 = parse ( 'one="0"\ntwo="-123"\nthree=".123"\nfour="-12e-10"', { inferNumbers: true, inferStrings: true } );

    console.log ( JSON.stringify ( output1, null, 2 ) );
    t.deepEqual ( output1, { one: 0, two: -123, three: 0.123, four: -12e-10 } );
    // t.deepEqual ( output2, { one: '0', two: '-123', three: '.123', four: '-12e-10' } );

  });

  it ( 'supports optionally inferring strings', t => {

    const output1 = parse ( "' one two '=' uno due '", { inferStrings: true } );
    const output2 = parse ( '" one two "=" uno due "', { inferStrings: true } );

    t.deepEqual ( output1, { ' one two ': ' uno due ' } );
    t.deepEqual ( output2, { ' one two ': ' uno due ' } );

  });

  it ( 'supports optionally inline comments', t => {

    const output1 = parse ( 'one=uno ; comment', { inlineComments: true } );
    const output2 = parse ( 'one=uno # comment', { inlineComments: true } );
    const outpu3 = parse ( 'one="uno" ; comment', { inlineComments: true, inferStrings: true } );

    t.deepEqual ( output1, { one: 'uno' } );
    t.deepEqual ( output2, { one: 'uno' } );
    t.deepEqual ( outpu3, { one: 'uno' } );

  });

  it ( 'supports complex inptus', t => {

    t.deepEqual ( parse ( INPUT ), OUTPUT );
    t.deepEqual ( parse ( INPUT, { inferBooleans: true, inferNulls: true, inferNumbers: true, inferStrings: true, inlineComments: true} ), OUTPUT_INFER );

  });

  it ( 'does not support inferring booleans, if not enabled', t => {

    const output1 = parse ( 'one=true\ntwo=TRUE' );
    const output2 = parse ( 'one=false\ntwo=FALSE' );

    t.deepEqual ( output1, { one: 'true', two: 'TRUE' } );
    t.deepEqual ( output2, { one: 'false', two: 'FALSE' } );

  });

  it ( 'does not support inferring nulls, if not enabled', t => {

    const output = parse ( 'one=null\ntwo=NULL' );

    t.deepEqual ( output, { one: 'null', two: 'NULL' } );

  });

  it ( 'does not support inferring numbers, if not enabled', t => {

    const output = parse ( 'one=0\ntwo=-123\nthree=.123\nfour=-12e-10' );

    t.deepEqual ( output, { one: '0', two: '-123', three: '.123', four: '-12e-10' } );

  });

  it ( 'does not support inferring strings, if not enabled', t => {

    const output1 = parse ( "' one two '=' uno due '" );
    const output2 = parse ( '" one two "=" uno due "' );

    t.deepEqual ( output1, { "' one two '": "' uno due '" } );
    t.deepEqual ( output2, { '" one two "': '" uno due "' } );

  });

  it ( 'does not support inline comments, if not enabled', t => {

    const output1 = parse ( 'one=uno ; comment' );
    const output2 = parse ( 'one=uno # comment' );

    t.deepEqual ( output1, { one: 'uno ; comment' } );
    t.deepEqual ( output2, { one: 'uno # comment' } );

  });

});
