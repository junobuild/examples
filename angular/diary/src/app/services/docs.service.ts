import { Inject, Injectable } from '@angular/core';
import type { Doc } from '@junobuild/core';
import { listDocs } from '@junobuild/core';
import type { Observable } from 'rxjs';
import {
  combineLatest,
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
  private reloadSubject = new Subject<void>();

  docs$: Observable<Doc<Entry>[]> = combineLatest([
    this.authService.user$,
    this.reloadSubject.pipe(startWith(undefined)),
  ]).pipe(
    switchMap(([user, _]) => {
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

  constructor(@Inject(AuthService) private authService: AuthService) {}

  reload() {
    this.reloadSubject.next();
  }
}
