export interface RxChangeEvent<C, V, K> {
    method: string;
    key: K;
    value: V;
    collection: C;
}
