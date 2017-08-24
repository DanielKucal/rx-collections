import { RxChangeEvent } from '../change-event.interface';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { RxCollection } from './collection.interface';

export class RxSet<T> implements RxCollection, Set<T> {
    public [Symbol.toStringTag] = (new Set())[Symbol.toStringTag];
    protected _collection: Set<T>;
    protected _subject: Subject<RxChangeEvent<Set<T>, T, undefined>> = new Subject();

    constructor(iterable: Iterable<T> = []) {
        this._collection = new Set(iterable);
    }

    /*public toCollection(): Set<T> {
        return new Set(this._collection);
    }*/

    public get change$(): Observable<RxChangeEvent<Set<T>, T, undefined>> {
        return this._subject.asObservable();
    }

    public add(value: T): this {
        this._subject.next({
            method: 'add',
            key: undefined,
            value: value,
            collection: this._collection.add(value),
        });
        return this;
    }

    public clear(): void {
        let result = this._collection.clear();
        this._subject.next({
            method: 'clear',
            key: undefined,
            value: undefined,
            collection: this._collection,
        });
        return result;
    }

    public delete(value: T): boolean {
        let result = this._collection.delete(value);
        this._subject.next({
            method: 'delete',
            key: undefined,
            value: value,
            collection: this._collection,
        });
        return result;
    }

    public get size(): number {
        return this._collection.size;
    }

    public forEach(callbackfn: (value: T, value2: T, set: Set<T>) => void, thisArg?: any): void {
        return this._collection.forEach(callbackfn, thisArg);
    }

    public has(value: T): boolean {
        return this._collection.has(value);
    }

    public [Symbol.iterator](): IterableIterator<T> {
        return this._collection[Symbol.iterator]();
    }

    public entries(): IterableIterator<[T, T]> {
        return this._collection.entries();
    }

    public keys(): IterableIterator<T> {
        return this._collection.keys();
    }

    public values(): IterableIterator<T> {
        return this._collection.values();
    }
}
