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
  docs: WritableSignal<Doc<Entry>[]> = signal([]);

  constructor() {
    effect(async () => await this.loadDocs(this.authService.signedIn()), {
      allowSignalWrites: true,
    });
  }

  async reload() {
    await this.loadDocs(this.authService.signedIn());
  }

  private async loadDocs(signedIn: boolean) {
    if (!signedIn) {
      this.docs.set([]);
      return;
    }

    const { items } = await listDocs<Entry>({
      collection: 'notes',
    });

    this.docs.set(items);
  }
}
