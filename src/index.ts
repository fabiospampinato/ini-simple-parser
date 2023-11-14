
/* IMPORT */

import {inferBoolean, inferNull, inferNumber, inferString, stripComments} from './utils';
import type {Options, Primitive, Results} from './types';

/* MAIN */

//TODO: Maybe make this a special-case of a spec-compliant configurable TOML parser
//TODO: Maybe write this a bit more low-level, for a bit better performance, potentially

const parse = ( input: string, options: Options = {} ): Results => {

  /* CONSTANTS */

  const COMMENT1 = 35; // #
  const COMMENT2 = 59; // ;
  const SECTION_START = 91; // [
  const SECTION_END = 93; // ]

  const INFER_BOOLEANS = !!options.inferBooleans;
  const INFER_NULLS = !!options.inferNulls;
  const INFER_NUMBERS = !!options.inferNumbers;
  const INFER_STRINGS = !!options.inferStrings;
  const INLINE_COMMENTS = !!options.inlineComments;

  /* PARSING */

  const results: Results = {};
  const lines = input.split ( /\r?\n|\r/g );

  let section = results;

  for ( let i = 0, l = lines.length; i < l; i++ ) {

    const line = lines[i].trim ();

    if ( !line.length ) continue; // Empty line

    const firstChar = line.charCodeAt ( 0 );

    if ( firstChar === COMMENT1 || firstChar === COMMENT2 ) continue; // Comment line

    const lastChar = line.charCodeAt ( line.length - 1 );

    if ( firstChar === SECTION_START ) { // Section start

      if ( lastChar === SECTION_END ) { // Section end

        const key = line.slice ( 1, -1 );

        section = results[key] = {};

        continue;

      } else {

        throw new Error ( `Unexpected unclosed section at line ${i + 1}` );

      }

    }

    const delimiterIndex = line.indexOf ( '=' );

    if ( delimiterIndex >= 0 ) { // Key-value pair

      let key: Primitive = line.slice ( 0, delimiterIndex ).trim ();
      let value: Primitive = line.slice ( delimiterIndex + 1 ).trim ();

      if ( INLINE_COMMENTS ) {
        value = stripComments ( value );
      }

      if ( INFER_BOOLEANS ) {
        value = inferBoolean ( value );
      }

      if ( INFER_NULLS ) {
        value = inferNull ( value );
      }

      if ( INFER_NUMBERS ) {
        value = inferNumber ( value );
      }

      if ( INFER_STRINGS ) {
        key = inferString ( key );
        value = inferString ( value );
      }

      section[`${key}`] = value;

      continue;

    }

    throw new Error ( `Unexpected characters at line ${i + 1}` );

  }

  return results;

};

/* EXPORT */

export default parse;
export type {Options, Results};
