import type { ToPositive } from "./shared";
import type { Clamp, Decrement, GreaterThan, Join, Length, Negatives, Split, Subtract } from "./utils";

namespace Strings {
    type BackwardSlice<S extends string, N extends number = 1> = N extends 0
        ? S
        : Split<S> extends [...infer Rest, infer Tail]
        ? BackwardSlice<Join<Rest>, Decrement<N>>
        : "";

    type ForwardSlice<S extends string, N extends number = 1> = N extends 0
        ? S
        : Split<S> extends [infer Head, ...infer Rest]
        ? ForwardSlice<Join<Rest>, Decrement<N>>
        : "";

    export type Slice<S extends string, Start extends number = 0, End extends number = Length<S>> = GreaterThan<Start, 0> extends true
        ? GreaterThan<0, End> extends true
            ? ForwardSlice<BackwardSlice<S, ToPositive[Clamp<Negatives[Length<S>], End, 0> & keyof ToPositive]>, Clamp<0, Start, Length<S>>>
            : //@ts-ignore
              ForwardSlice<
                  //@ts-ignore
                  BackwardSlice<S, Subtract<Length<S>, Clamp<0, End, Length<S>>>>,
                  Clamp<0, Start, Length<S>>
              >
        : GreaterThan<0, End> extends true
        ? ForwardSlice<
              BackwardSlice<S, ToPositive[Clamp<Negatives[Length<S>], End, 0> & keyof ToPositive]>,
              Subtract<Length<S>, ToPositive[Clamp<Negatives[Length<S>], Start, 0> & keyof ToPositive]>
          >
        : ForwardSlice<
              BackwardSlice<S, Subtract<Length<S>, Clamp<0, End, Length<S>>>>,
              Subtract<Length<S>, ToPositive[Clamp<Negatives[Length<S>], Start, 0> & keyof ToPositive]>
          >;
}
