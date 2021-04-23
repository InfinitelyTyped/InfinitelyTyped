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
    }
}
