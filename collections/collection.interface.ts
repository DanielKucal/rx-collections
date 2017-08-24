import { RxChangeEvent } from '../change-event.interface';
import { Observable } from 'rxjs/Observable';

export interface RxCollection {
    change$: Observable<RxChangeEvent<any, any, any>>;
    // toCollection(): any;
}
