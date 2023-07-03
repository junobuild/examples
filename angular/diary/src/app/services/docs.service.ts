import {
  effect,
  inject,
  Injectable,
  signal,
  WritableSignal,
} from '@angular/core';
import type { Doc } from '@junobuild/core';
import { listDocs } from '@junobuild/core';
import type { Entry } from '../types/entry';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DocsService {
  private readonly authService = inject(AuthService);
  private reloadSignal: WritableSignal<number> = signal(0);
  docs: WritableSignal<Doc<Entry>[]> = signal([]);

  constructor() {
    effect(
      async () => {
        const user = this.authService.user();
        if (user) {
          // we need to read reloadSignal for the effect to work
          console.log(`Loading entries ${this.reloadSignal()}`);
          const { items } = await listDocs<Entry>({
            collection: 'notes',
            filter: {},
          });
          this.docs.set(items);
        } else this.docs.set([]);
      },
      { allowSignalWrites: true }
    );
  }

  reload() {
    this.reloadSignal.update((count) => count + 1);
  }
}
