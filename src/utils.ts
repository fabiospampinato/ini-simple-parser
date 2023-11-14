
/* IMPORT */

import type {Primitive} from './types';

/* MAIN */

const inferBoolean = ( value: Primitive ): Primitive => {
  if ( !isString ( value ) || !value.length ) return value;
  if ( value === 'true' || value === 'TRUE' ) return true;
  if ( value === 'false' || value === 'FALSE' ) return false;
  return value;
};

const inferNull = ( value: Primitive ): Primitive => {
  if ( !isString ( value ) || !value.length ) return value;
  if ( value === 'null' || value === 'NULL' ) return null;
  return value;
};

const inferNumber = ( value: Primitive ): Primitive => {
  if ( !isString ( value ) || !value.length ) return value;
  const firstChar = value.charCodeAt ( 0 );
  if ( firstChar !== 43 && firstChar !== 45 && firstChar !== 46 && ( firstChar < 48 || firstChar > 57 ) ) return value;
  const number = Number ( value );
  if ( !Number.isNaN ( number ) ) value = number;
  return value;
};

const inferString = ( value: Primitive ): Primitive => {
  if ( !isString ( value ) || !value.length ) return value;
  const firstChar = value[0];
  const lastChar = value[value.length - 1];
  if ( firstChar === "'" && lastChar === "'" ) return value.slice ( 1, -1 );
  if ( firstChar === '"' && lastChar === '"' ) return value.slice ( 1, -1 );
  return value;
};

const isString = ( value: unknown ): value is string => {
  return typeof value === 'string';
};

const stripComments = ( value: Primitive ): Primitive => {
  if ( !isString ( value ) || !value.length ) return value;
  const comment1Index = value.indexOf ( '#' );
  const comment2Index = value.indexOf ( ';' );
  const commentIndex = ( comment1Index >= 0 ) ? ( comment2Index >= 0 ? Math.min ( comment1Index, comment2Index ) : comment1Index ) : comment2Index;
  if ( commentIndex < 0 ) return value;
  value = value.slice ( 0, commentIndex ).trimEnd ();
  return value;
};

/* EXPORT */

export {inferBoolean, inferNull, inferNumber, inferString, isString, stripComments};
