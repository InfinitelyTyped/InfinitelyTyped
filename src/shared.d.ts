declare namespace InfinitelyTyped {
    export namespace Shared {
        export type ToPositive = Utils.InvertList<Utils.Negatives>;

        export type WhiteSpaceCharacter = " " | "\n";

        export type Nullish = null | undefined;

        export type Falsy = false | "" | 0 | 0n | Nullish;

        export type And<A, B> = A extends Falsy ? A : B;

        export type Or<A, B> = A extends Falsy ? B : A;

        export type NullishCoalescing<A, B> = A extends Nullish ? B : A;

        export type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

        export namespace Logic {
            export type And<A extends boolean, B extends boolean> = A extends true ? (B extends true ? true : false) : false;

            export type Or<A extends boolean, B extends boolean> = A extends true ? true : B extends true ? true : false;

            export type Not<T extends boolean> = T extends true ? false : true;
        }
    }
}
