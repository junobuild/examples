import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { Doc } from '@junobuild/core';
import type { Entry } from '../types/entry';
import { from, map, shareReplay, startWith, switchMap } from 'rxjs';
import { listDocs } from '@junobuild/core';

@Injectable({
  providedIn: 'root',
})
export class DocsService {
  docs$: Observable<Doc<Entry>[]> = from(
    listDocs<Entry>({
      collection: 'notes',
      filter: {},
    })
  ).pipe(
    map(({ items }) => items),
    startWith([]),
    shareReplay({ bufferSize: 1, refCount: true })
  );
}
