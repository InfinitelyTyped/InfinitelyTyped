declare namespace InfinitelyTyped {
    export namespace Utils {
        export type Naturals = readonly [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

        export type Negatives = readonly [0, -1, -2, -3, -4, -5, -6, -7, -8, -9, -10, -11, -12, -13, -14, -15, -16, -17, -18, -19, -20, -21, -22, -23, -24];

        export type ReversedNegatives = readonly [-24, -23, -22, -21, -20, -19, -18, -17, -16, -15, -14, -13, -12, -11, -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0];

        export type UInts = readonly [0, ...Naturals];

        export type LoopIndex = readonly [-1, ...UInts];

        export type Increment<T extends keyof Naturals & number> = Naturals[T];
        export type Decrement<T extends keyof LoopIndex & number> = LoopIndex[T];

        export type Add<A extends keyof LoopIndex & number, B extends keyof LoopIndex & number> = B extends 0
            ? A
            : B extends keyof Naturals
            ? A extends keyof Naturals
                ? Add<Increment<A>, Decrement<B>>
                : 6
            : A;

        export type Subtract<A extends keyof LoopIndex & number, B extends keyof LoopIndex & number> = B extends 0
            ? A
            : B extends keyof Naturals
            ? A extends keyof Naturals
                ? Subtract<Decrement<A>, Decrement<B>>
                : 6
            : A;

        export type Counter = readonly [...ReversedNegatives, ...Naturals];

        export type Index = Exclude<keyof Negatives, keyof []>;

        export type FilterKey<A extends ReadonlyArray<number>, Entry extends string | number> = {
            [Key in keyof A]: A[Key] extends Entry ? Key : never;
        };

        export type FindListIndex<A extends ReadonlyArray<number>, Entry extends string | number> = FilterKey<A, Entry>[keyof FilterKey<A, Entry>] extends infer T
            ? T extends Index
                ? T
                : never
            : never;

        export type InvertList<A extends ReadonlyArray<number>> = {
            [K in A[keyof A & number]]: UInts[FindListIndex<A, K>];
        };

        export type ClampMax<V extends number, M extends number> = GreaterThan<V, M> extends true ? M : V;
        export type ClampMin<V extends number, M extends number> = GreaterThan<M, V> extends true ? M : V;
        export type Clamp<Min extends number, Val extends number, Max extends number> = ClampMin<ClampMax<Val, Max>, Min>;

        export type UnknownArray = ReadonlyArray<unknown>;

        export type VoidAsyncFunction = () => Promise<void>;

        export type UnknownRecord = Readonly<Record<string | number | symbol, unknown>>;

        export type RecordEntry = Readonly<[string, unknown]>;

        export type RecordEntries = ReadonlyArray<RecordEntry>;

        export type Primitive = boolean | string | number | bigint | symbol | undefined | null | void;

        export type Override<A, B> = Omit<A, keyof B> & B;

        export type Writable<T> = {
            -readonly [Key in keyof T]: T[Key];
        };

        export type Consumer<T> = (_: T) => void;

        export type UnionToOverloadedConsumer<Union> = UnionToIntersection<Union extends unknown ? Consumer<Union> : never>;

        export type UnionLast<Union> = UnionToOverloadedConsumer<Union> extends Consumer<infer Last> ? Last : never;

        export type UnionExcludingLast<Union> = Exclude<Union, UnionLast<Union>>;

        export type UnionToIntersection<Union> = (Union extends unknown ? Consumer<Union> : never) extends Consumer<infer Intersection> ? Intersection : never;

        export type UnionToTuple<Union, CurrentTuple extends UnknownArray = []> = [Union] extends [never]
            ? CurrentTuple
            : UnionToTuple<UnionExcludingLast<Union>, TuplePrepend<CurrentTuple, UnionLast<Union>>>;

        export type TuplePrepend<Tuple extends UnknownArray, InsertedElement> = [InsertedElement, ...Tuple];

        export type TupleAppend<Tuple extends UnknownArray, InsertedElement> = [...Tuple, InsertedElement];

        export type TupleConcat<Tuple0 extends UnknownArray, Tuple1 extends UnknownArray> = [...Tuple0, ...Tuple1];

        export type TupleFirst<Tuple extends UnknownArray> = Tuple extends Readonly<[infer Head, ...UnknownArray]> ? Head : never;

        export type TupleExcludingFirst<Tuple extends UnknownArray> = Tuple extends Readonly<[unknown, ...infer Tail]> ? Tail : never;

        export type TupleLast<Tuple extends UnknownArray> = Tuple extends Readonly<[...infer _, infer Last]> ? Last : never;

        export type TupleExcludingLast<Tuple extends UnknownArray> = Tuple extends Readonly<[...infer Rest, unknown]> ? Rest : never;

        export type TupleToIntersection<Tuple extends UnknownArray> = Tuple extends []
            ? {}
            : Tuple extends Readonly<[infer Head, ...infer Tail]>
            ? Head & TupleToIntersection<Tail>
            : never;

        export type TupleToUnion<T extends UnknownArray> = T[number];

        export type FindIndex<Tuple extends Array<unknown>, Entry extends Tuple[number]> = TupleToUnion<
            {
                [Index in keyof Tuple]: Tuple[Index] extends Entry ? Index : never;
            }
        >;

        export type OmitKeysThatDontMatchEntry<StringRecord extends Record<string, string>, Entry extends string> = {
            [Key in keyof StringRecord]: StringRecord[Key] extends Entry ? Key : never;
        };

        export type FindKey<StringRecord extends Record<string, string>, Entry extends string> = OmitKeysThatDontMatchEntry<StringRecord, Entry>[keyof OmitKeysThatDontMatchEntry<
            StringRecord,
            Entry
        >];

        export type Indices<Tuple extends UnknownArray> = Exclude<keyof Tuple, keyof []>;

        export type Filter<In extends UnknownArray, What, Out extends UnknownArray = []> = In extends [never]
            ? Out
            : In extends [infer Head, ...infer Tail]
            ? Filter<Tail, What, Head extends What ? Out : [Head, ...Out]>
            : Out;

        export type FilterNever<Input extends UnknownArray> = Filter<Input, never>;

        export type TupleOf<Value, Length extends LoopIndex[number]> = Length extends 0 | -1 ? [] : [Value, ...TupleOf<Value, LoopIndex[Length]>];

        export type InvertRecord<StringRecord extends Record<string, string>> = {
            [Entry in StringRecord[keyof StringRecord]]: FindKey<StringRecord, Entry>;
        };

        export type EntriesToKeys<Entries extends RecordEntries> = {
            [Key in keyof Entries]: Entries[Key] extends RecordEntry ? Entries[Key][0] : never;
        };

        export type EntriesToValues<Entries extends RecordEntries> = {
            [Key in keyof Entries]: Entries[Key] extends RecordEntry ? Entries[Key][1] : never;
        };

        export type EntriesToRecord<Entries extends RecordEntries> = {
            [Key in EntriesToKeys<Entries>[number]]: {
                [Index in keyof EntriesToKeys<Entries>]: Entries[Index] extends [Key, unknown] ? Entries[Index][1] : never;
            } extends ReadonlyArray<infer Value>
                ? Value
                : never;
        };

        export type CollapseRecordIntersection<InputRecord extends Readonly<Record<string, unknown>>> = {
            [Key in keyof InputRecord]: InputRecord[Key];
        };

        export type RecordToKeys<T extends UnknownRecord> = UnionToTuple<keyof T>;

        export type RecordToValues<InputRecord extends UnknownRecord, Union = keyof InputRecord, CurrentTuple extends UnknownArray = []> = [Union] extends [never]
            ? CurrentTuple
            : RecordToValues<InputRecord, UnionExcludingLast<Union>, TuplePrepend<CurrentTuple, InputRecord[Extract<UnionLast<Union>, keyof InputRecord>]>>;

        export type RecordToEntries<InputRecord extends UnknownRecord> = RecordToValues<
            {
                [Key in Extract<Exclude<keyof RecordToValues<InputRecord>, keyof []>, keyof RecordToKeys<InputRecord>>]: [
                    RecordToKeys<InputRecord>[Key],
                    RecordToValues<InputRecord>[Key]
                ];
            }
        >;

        export type GreaterThan<A extends number, B extends number, Checked extends ReadonlyArray<number> = Counter> = TupleFirst<Checked> extends A
            ? false
            : TupleFirst<Checked> extends B
            ? true
            : GreaterThan<A, B, TupleExcludingFirst<Readonly<Checked>>>;

        export type LesserThan<A extends number, B extends number> = GreaterThan<B, A>;
    }
}
