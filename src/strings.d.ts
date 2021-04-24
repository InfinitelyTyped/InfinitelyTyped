/// <reference path="shared.d.ts" />
/// <reference path="utils.d.ts" />
/// <reference path="arrays.d.ts" />

declare namespace InfinitelyTyped {
    export namespace Strings {
        export type Split<Input extends string, Separator extends string = ""> = Input extends ""
            ? []
            : Input extends `${infer Start}${Separator}${infer End}`
            ? [Start, ...Split<End, Separator>]
            : [Input];

        export type Length<T extends string> = Split<T>["length"];

        export type TrimEnd<T extends string> = T extends `${infer Rest}${Shared.WhiteSpaceCharacter}` ? TrimEnd<Rest> : T;
        export type TrimStart<T extends string> = T extends `${Shared.WhiteSpaceCharacter}${infer Rest}` ? TrimStart<Rest> : T;

        export type Trim<T extends string> = TrimEnd<TrimStart<T>>;

        export type Concat<S1 extends string, S2 extends string> = `${S1}${S2}`;

        export type BackwardSlice<S extends string, N extends number = 1> = N extends 0
            ? S
            : Split<S> extends [...infer Rest, infer Tail]
            ? BackwardSlice<Arrays.Join<Rest>, Utils.Decrement<N>>
            : "";

        export type ForwardSlice<S extends string, N extends number = 1> = N extends 0
            ? S
            : Split<S> extends [infer Head, ...infer Rest]
            ? ForwardSlice<Arrays.Join<Rest>, Utils.Decrement<N>>
            : "";

        export type Slice<S extends string, Start extends number = 0, End extends number = Length<S>> = Shared.Logic.Or<
            Utils.GreaterThan<Start, 0>,
            Start extends 0 ? true : false
        > extends true
            ? Utils.GreaterThan<0, End> extends true
                ? ForwardSlice<BackwardSlice<S, Shared.ToPositive[Utils.Clamp<Utils.Negatives[Length<S>], End, 0> & keyof Shared.ToPositive]>, Utils.Clamp<0, Start, Length<S>>>
                : //@ts-ignore
                  ForwardSlice<
                      //@ts-ignore
                      BackwardSlice<S, Utils.Subtract<Length<S>, Utils.Clamp<0, End, Length<S>>>>,
                      Utils.Clamp<0, Start, Length<S>>
                  >
            : Utils.GreaterThan<0, End> extends true
            ? ForwardSlice<
                  BackwardSlice<S, Shared.ToPositive[Utils.Clamp<Utils.Negatives[Length<S>], End, 0> & keyof Shared.ToPositive]>,
                  Utils.Subtract<Length<S>, Shared.ToPositive[Utils.Clamp<Utils.Negatives[Length<S>], Start, 0> & keyof Shared.ToPositive]>
              >
            : ForwardSlice<
                  BackwardSlice<S, Utils.Subtract<Length<S>, Utils.Clamp<0, End, Length<S>>>>,
                  Utils.Subtract<Length<S>, Shared.ToPositive[Utils.Clamp<Utils.Negatives[Length<S>], Start, 0> & keyof Shared.ToPositive]>
              >;

        export type Substring<S extends string, Start extends number = 0, End extends number = Length<S>> = Utils.GreaterThan<Start, End> extends true
            ? Slice<S, Utils.ClampMin<End, 0>, Utils.ClampMin<Start, 0>>
            : Slice<S, Utils.ClampMin<Start, 0>, Utils.ClampMin<End, 0>>;

        //@ts-ignore
        export type Substr<S extends string, Start extends number = 0, End extends number = Length<S>> = Slice<S, Start, Utils.Add<Start, End>>;

        export type StartsWith<S extends string, Q extends string> = Q extends ""
            ? true
            : Split<S> extends [infer Head, ...infer Rest]
            ? Split<Q> extends [infer Char, ...infer Term]
                ? Head extends Char
                    ? StartsWith<Arrays.Join<Rest>, Arrays.Join<Term>> extends true
                        ? true
                        : false
                    : false
                : false
            : Q extends ""
            ? true
            : false;

        export type EndsWith<S extends string, Q extends string> = Q extends ""
            ? true
            : Split<S> extends [...infer Rest, infer Head]
            ? Split<Q> extends [...infer Term, infer Char]
                ? Head extends Char
                    ? EndsWith<Arrays.Join<Rest>, Arrays.Join<Term>> extends true
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

        export type IndexOf<S extends string, Q extends string, F extends number = 0, I extends number = 0> = F extends 0
            ? Q extends ""
                ? 0
                : S extends ""
                ? -1
                : S extends `${infer Head}${infer Rest}`
                ? StartsWith<S, Q> extends true
                    ? Utils.Clamp<0, I, Length<S>>
                    : IndexOf<Rest, Q, 0, Utils.Increment<I>>
                : -1
            : IndexOf<Slice<S, F>, Q, 0, F>;

        // ! implement fromIndex like IndexOf
        export type LastIndexOf<S extends string, Q extends string, I extends number = Length<S>> = Q extends ""
            ? 0
            : S extends ""
            ? -1
            : Split<S> extends [...infer Rest, infer Tail]
            ? EndsWith<S, Q> extends true
                ? Utils.Clamp<0, I, Length<S>>
                : LastIndexOf<Arrays.Join<Rest>, Q, Utils.Decrement<I>>
            : -1;

        //@ts-ignore
        export type Repeat<S extends string, N extends number = 1> = N extends 0 | 1 ? S : `${S}${Repeat<S, Utils.Decrement<N>>}`;

        //@ts-ignore
        export type PadEnd<S extends string, L extends number = 0, F extends string = " "> = L extends 0 ? S : `${S}${Repeat<F, Utils.Subtract<Length<S>, L>>}`;

        //@ts-ignore
        export type PadStart<S extends string, L extends number = 0, F extends string = " "> = L extends 0 ? S : `${Repeat<F, Utils.Subtract<Length<S>, L>>}${S}`;
    }
}
