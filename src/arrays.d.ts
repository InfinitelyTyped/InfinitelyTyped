/// <reference path="shared.d.ts" />
/// <reference path="utils.d.ts" />

declare namespace InfinitelyTyped {
    export namespace Arrays {
        export type Reverse<A extends Utils.UnknownArray> = A extends [infer H, ...infer T] ? [...Reverse<T>, H] : [];

        export type Join<A extends Utils.UnknownArray, Sep extends string = ""> = A extends readonly [infer Head, ...infer Rest]
            ? Join<Rest, Sep> extends ""
                ? `${Head & (string | number | bigint | boolean)}`
                : `${Head & (string | number | bigint | boolean)}${Sep}${Join<Rest, Sep>}`
            : "";

        export type Length<A extends Utils.UnknownArray> = A["length"];

        export type Concat<A1 extends Utils.UnknownArray, A2 extends Utils.UnknownArray> = [...A1, ...A2];

        export type Filter<A extends [unknown, ...unknown[]] | [], I extends unknown, R extends Utils.UnknownArray = []> = A extends [infer Head, ...infer Rest]
            ? Shared.Logic.Not<Head extends I ? true : false> extends true
                ? Rest extends [unknown, ...unknown[]]
                    ? Filter<Rest, I, [...R, Head]>
                    : Filter<[], I, [...R, Head]>
                : Rest extends [unknown, ...unknown[]]
                ? Filter<Rest, I, R>
                : Filter<[], I, R>
            : R;

        export type Fill<A extends Utils.UnknownArray, F extends unknown> = A extends [infer Head, ...infer Rest] ? [F, ...Fill<Rest, F>] : [];

        export type ToString<A extends Utils.UnknownArray> = `${Join<A, ",">}`;

        export type Includes<A extends Utils.UnknownArray, E extends unknown> = A extends [infer Head, ...infer Rest] ? (Head extends E ? true : Includes<Rest, E>) : false;

        export type BackwardSlice<A extends Utils.UnknownArray, N extends number = 1> = N extends 0
            ? A
            : A extends [...infer Rest, infer Tail]
            ? BackwardSlice<Rest, Utils.Decrement<N>>
            : [];

        export type ForwardSlice<A extends Utils.UnknownArray, N extends number = 1> = N extends 0
            ? A
            : A extends [infer Head, ...infer Rest]
            ? ForwardSlice<Rest, Utils.Decrement<N>>
            : [];

        export type Slice<A extends Utils.UnknownArray, Start extends number = 0, End extends number = Length<A>> = Shared.Logic.Or<
            Utils.GreaterThan<Start, 0>,
            Start extends 0 ? true : false
        > extends true
            ? Utils.GreaterThan<0, End> extends true
                ? ForwardSlice<BackwardSlice<A, Shared.ToPositive[Utils.Clamp<Utils.Negatives[Length<A>], End, 0> & keyof Shared.ToPositive]>, Utils.Clamp<0, Start, Length<A>>>
                : //@ts-ignore
                  ForwardSlice<
                      //@ts-ignore
                      BackwardSlice<A, Utils.Subtract<Length<A>, Utils.Clamp<0, End, Length<A>>>>,
                      Utils.Clamp<0, Start, Length<A>>
                  >
            : Utils.GreaterThan<0, End> extends true
            ? ForwardSlice<
                  BackwardSlice<A, Shared.ToPositive[Utils.Clamp<Utils.Negatives[Length<A>], End, 0> & keyof Shared.ToPositive]>,
                  Utils.Subtract<Length<A>, Shared.ToPositive[Utils.Clamp<Utils.Negatives[Length<A>], Start, 0> & keyof Shared.ToPositive]>
              >
            : ForwardSlice<
                  BackwardSlice<A, Utils.Subtract<Length<A>, Utils.Clamp<0, End, Length<A>>>>,
                  Utils.Subtract<Length<A>, Shared.ToPositive[Utils.Clamp<Utils.Negatives[Length<A>], Start, 0> & keyof Shared.ToPositive]>
              >;

        //! implement fromIndex
        export type IndexOf<A extends Utils.UnknownArray, E extends unknown, I extends number = 0> = Length<A> extends 0
            ? -1
            : A extends [infer Head, ...infer Rest]
            ? Head extends E
                ? I
                : IndexOf<Rest, E, Utils.Increment<I>>
            : -1;

        //! implement fromIndex
        export type LastIndexOf<A extends Utils.UnknownArray, E extends unknown, I extends number = Length<A>> = I extends 0
            ? -1
            : A extends [...infer Rest, infer Tail]
            ? Tail extends E
                ? Utils.Decrement<I>
                : LastIndexOf<Rest, E, Utils.Decrement<I>>
            : -1;

        type Test = IndexOf<[1, 2, 3, 4, 1], 1, 4>;
    }
}
