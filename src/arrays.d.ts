/// <reference path="shared.d.ts" />
/// <reference path="utils.d.ts" />

declare namespace InfinitelyTyped {
    export namespace Arrays {
        export type Reverse<S> = S extends [infer H, ...infer T] ? [...Reverse<T>, H] : [];
    }
}
