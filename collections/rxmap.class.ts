import { RxChangeEvent } from '../change-event.interface';
import { RxCollection } from './collection.interface';
import { Observable, Subject } from 'rxjs';

export class RxMap<K, V> implements RxCollection, Map<K, V> {
  public [Symbol.toStringTag] = (new Map())[Symbol.toStringTag];
  protected _collection: Map<K, V>;
  protected _subject: Subject<RxChangeEvent<Map<K, V>, V, K>> = new Subject();

  constructor(mapOrArray: Map<K, V> | Array<[K, V]> = []) {
    this._collection = new Map(mapOrArray);
  }

  /*public toCollection(): Map<K, V> {
      return new Map(this._collection);
  }*/

  public get change$(): Observable<RxChangeEvent<Map<K, V>, V, K>> {
    return this._subject.asObservable();
  }

  public set(key: K, value: V): this {
    this._subject.next({
      method: 'set',
      key,
      value,
      collection: this._collection.set(key, value),
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

  public delete(key: K): boolean {
    const value = this._collection.get(key);
    const result = this._collection.delete(key);
    this._subject.next({
      method: 'delete',
      key,
      value,
      collection: this._collection,
    });
    return result;
  }

  public get size(): number {
    return this._collection.size;
  }

  public forEach(callbackFn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void {
    return this._collection.forEach(callbackFn, thisArg);
  }

  public get(key: K): any | V {
    return this._collection.get(key);
  }

  public has(key: K): boolean {
    return this._collection.has(key);
  }

  public [Symbol.iterator](): IterableIterator<[K, V]> {
    return this._collection[Symbol.iterator]();
  }

  public entries(): IterableIterator<[K, V]> {
    return this._collection.entries();
  }

  public keys(): IterableIterator<K> {
    return this._collection.keys();
  }

  public values(): IterableIterator<V> {
    return this._collection.values();
  }
}
