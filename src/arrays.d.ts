/// <reference path="shared.d.ts" />
/// <reference path="utils.d.ts" />

declare namespace InfinitelyTyped {
    export namespace Arrays {
        export type Reverse<S extends Utils.UnknownArray> = S extends [infer H, ...infer T] ? [...Reverse<T>, H] : [];

        export type Join<A extends Utils.UnknownArray, Sep extends string = ""> = A extends readonly [infer Head, ...infer Rest]
            ? Join<Rest, Sep> extends ""
                ? `${Head & (string | number | bigint | boolean)}`
                : `${Head & (string | number | bigint | boolean)}${Sep}${Join<Rest, Sep>}`
            : "";

        export type Concat<A1 extends Utils.UnknownArray, A2 extends Utils.UnknownArray> = [...A1, ...A2];
    }
}
