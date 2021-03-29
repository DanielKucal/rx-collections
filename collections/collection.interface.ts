import { RxChangeEvent } from '../change-event.interface';
import { Observable } from 'rxjs';

export interface RxCollection {
    change$: Observable<RxChangeEvent<any, any, any>>;
    // toCollection(): any;
}
