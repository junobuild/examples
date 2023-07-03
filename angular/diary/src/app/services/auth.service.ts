import {
  computed,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { authSubscribe, User } from '@junobuild/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: WritableSignal<User | null> = signal(null);
  readonly signedIn: Signal<boolean> = computed(() => this.user() !== null);

  constructor() {
    authSubscribe((user) => this.user.set(user));
  }
}
