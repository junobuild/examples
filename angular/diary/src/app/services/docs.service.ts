import { inject, Injectable, Signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import type { Doc } from '@junobuild/core';
import { listDocs } from '@junobuild/core';
import type { Observable } from 'rxjs';
import {
  combineLatestWith,
  from,
  map,
  of,
  shareReplay,
  startWith,
  Subject,
  switchMap,
} from 'rxjs';
import type { Entry } from '../types/entry';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DocsService {
  private readonly authService = inject(AuthService);
  private reloadSubject = new Subject<void>();

  docs$: Observable<Doc<Entry>[]> = toObservable(this.authService.user).pipe(
    combineLatestWith(this.reloadSubject.pipe(startWith(undefined))),
    switchMap(([user]) => {
      if (user === null) {
        return of([]);
      }

      return from(
        listDocs<Entry>({
          collection: 'notes',
          filter: {},
        })
      ).pipe(map(({ items }) => items));
    }),
    startWith([]),
    shareReplay({ bufferSize: 1, refCount: true })
  );
  docs: Signal<Doc<Entry>[]> = toSignal(this.docs$, { initialValue: [] });

  reload() {
    this.reloadSubject.next();
  }
}
