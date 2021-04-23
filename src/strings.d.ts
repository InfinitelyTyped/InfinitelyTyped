declare namespace InfinitelyTyped {
    export namespace Strings {
        type BackwardSlice<S extends string, N extends number = 1> = N extends 0
            ? S
            : Utils.Split<S> extends [...infer Rest, infer Tail]
            ? BackwardSlice<Utils.Join<Rest>, Utils.Decrement<N>>
            : "";

        type ForwardSlice<S extends string, N extends number = 1> = N extends 0
            ? S
            : Utils.Split<S> extends [infer Head, ...infer Rest]
            ? ForwardSlice<Utils.Join<Rest>, Utils.Decrement<N>>
            : "";

        export type Slice<S extends string, Start extends number = 0, End extends number = Utils.Length<S>> = Utils.GreaterThan<Start, 0> extends true
            ? Utils.GreaterThan<0, End> extends true
                ? ForwardSlice<
                      BackwardSlice<S, Shared.ToPositive[Utils.Clamp<Utils.Negatives[Utils.Length<S>], End, 0> & keyof Shared.ToPositive]>,
                      Utils.Clamp<0, Start, Utils.Length<S>>
                  >
                : //@ts-ignore
                  ForwardSlice<
                      //@ts-ignore
                      BackwardSlice<S, Utils.Subtract<Utils.Length<S>, Utils.Clamp<0, End, Utils.Length<S>>>>,
                      Utils.Clamp<0, Start, Utils.Length<S>>
                  >
            : Utils.GreaterThan<0, End> extends true
            ? ForwardSlice<
                  BackwardSlice<S, Shared.ToPositive[Utils.Clamp<Utils.Negatives[Utils.Length<S>], End, 0> & keyof Shared.ToPositive]>,
                  Utils.Subtract<Utils.Length<S>, Shared.ToPositive[Utils.Clamp<Utils.Negatives[Utils.Length<S>], Start, 0> & keyof Shared.ToPositive]>
              >
            : ForwardSlice<
                  BackwardSlice<S, Utils.Subtract<Utils.Length<S>, Utils.Clamp<0, End, Utils.Length<S>>>>,
                  Utils.Subtract<Utils.Length<S>, Shared.ToPositive[Utils.Clamp<Utils.Negatives[Utils.Length<S>], Start, 0> & keyof Shared.ToPositive]>
              >;

        export type StartsWith<S extends string, Q extends string> = Q extends ""
            ? true
            : Utils.Split<S> extends [infer Head, ...infer Rest]
            ? Utils.Split<Q> extends [infer Char, ...infer Term]
                ? Head extends Char
                    ? StartsWith<Utils.Join<Rest>, Utils.Join<Term>> extends true
                        ? true
                        : false
                    : false
                : false
            : Q extends ""
            ? true
            : false;

        export type EndsWith<S extends string, Q extends string> = Q extends ""
            ? true
            : Utils.Split<S> extends [...infer Rest, infer Head]
            ? Utils.Split<Q> extends [...infer Term, infer Char]
                ? Head extends Char
                    ? EndsWith<Utils.Join<Rest>, Utils.Join<Term>> extends true
                        ? true
                        : false
                    : false
                : false
            : Q extends ""
            ? true
            : false;

        export type Includes<S extends string, Q extends string> = S extends `${infer Head}${infer Rest}`
            ? StartsWith<S, Q> extends true
                ? true
                : Includes<Rest, Q> extends true
                ? true
                : false
            : false;

        export type IndexOf<S extends string, Q extends string, F extends number = 0> = Q extends ""
            ? 0
            : S extends ""
            ? -1
            : S extends `${infer Head}${infer Rest}`
            ? StartsWith<S, Q> extends true
                ? Utils.Clamp<0, F, Utils.Length<S>>
                : IndexOf<Rest, Q, Utils.Increment<F>>
            : -1;

        export type LastIndexOf<S extends string, Q extends string, F extends number = Utils.Length<S>> = Q extends ""
            ? 0
            : S extends ""
            ? -1
            : Utils.Split<S> extends [...infer Rest, infer Tail]
            ? EndsWith<S, Q> extends true
                ? Utils.Clamp<0, F, Utils.Length<S>>
                : LastIndexOf<Utils.Join<Rest>, Q, Utils.Decrement<F>>
            : -1;

        //@ts-ignore
        export type Repeat<S extends string, N extends number = 1> = N extends 0 | 1 ? S : `${S}${Repeat<S, Utils.Decrement<N>>}`;

        //@ts-ignore
        export type PadEnd<S extends string, L extends number = 0, F extends string = " "> = L extends 0 ? S : `${S}${Repeat<F, Utils.Subtract<Utils.Length<S>, L>>}`;

        //@ts-ignore
        export type PadStart<S extends string, L extends number = 0, F extends string = " "> = L extends 0 ? S : `${Repeat<F, Utils.Subtract<Utils.Length<S>, L>>}${S}`;
    }
}
