import { RxChangeEvent } from '../change-event.interface';
import { RxCollection } from './collection.interface';
import { Observable, Subject } from 'rxjs';

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
      value,
      collection: this._collection.add(value),
    });
    return this;
  }

  public clear(): void {
    const result = this._collection.clear();
    this._subject.next({
      method: 'clear',
      key: undefined,
      value: undefined,
      collection: this._collection,
    });
    return result;
  }

  public delete(value: T): boolean {
    const result = this._collection.delete(value);
    this._subject.next({
      method: 'delete',
      key: undefined,
      value,
      collection: this._collection,
    });
    return result;
  }

  public get size(): number {
    return this._collection.size;
  }

  public forEach(callbackFn: (value: T, value2: T, set: Set<T>) => void, thisArg?: any): void {
    return this._collection.forEach(callbackFn, thisArg);
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
