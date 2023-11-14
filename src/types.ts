
/* MAIN */

type Options = {
  inferBooleans?: boolean,
  inferNulls?: boolean,
  inferNumbers?: boolean,
  inferStrings?: boolean,
  inlineComments?: boolean
};

type Primitive = null | boolean | number | string;

type Results = Partial<{
  [key: string]: Results | Primitive
}>;

/* EXPORT */

export type {Options, Primitive, Results};
