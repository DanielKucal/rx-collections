## Reactive collections
#### `npm install rx-collections`
Reactive implementations of ES6 Collections: Set and Map (and Array coming soon) created with TypeScript.
Using this library you can pretty easily watch for changes on your collections.
`RxSet` and `RxMap` classes wrap native equivalents adding `changes$` property, which is an `RxJS` Observable. Data are emitted in the following format:

```typescript
export interface RxChangeEvent<C, V, K> {
    method: string; // name of invoked method (e.g. "add", "delete")
    key: K;         // string or undefined
    value: V;       // any stored object affected in the operation
    collection: C;  // up-to-date Set or Map instance
}
```

### Example of usage (TypeScript):
```typescript
import { RxSet } from 'rx-collections';

let set: RxSet<number> = new RxSet<number>();
set.change$.subscribe((event) => {
    console.log('Method', event.method, 'has affected value:', event.value);
    console.log('Current Set state:', event.collection);
    // do something here, e.g. prevent adding null values
    if (event.method === 'add' && event.value === null) {
        event.collection.delete(null);
    }
});
set.add(1).add(2).add(3).add(null).add(4);
// Result: set contains merely 1,2,3,4
console.log('Array created from set:', Array.from(set));
```

**Note:** be careful to not accidentally overwrite the object, because observers won't be moved to the new instance. In order to clear it just use built-in `.clear()` method.

### Support this project by giving it a star if you'd like to see it developed!
