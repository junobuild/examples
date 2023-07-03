import {
  computed,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { authSubscribe, User } from '@junobuild/core';
import {Unsubscribe} from "@junobuild/core/dist/types/types/subscription.types";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: WritableSignal<User | undefined | null> = signal(undefined);
  readonly signedIn: Signal<boolean> = computed(
    () => this.user() !== null && this.user() !== undefined
  );

  constructor() {
    authSubscribe((user) => this.user.set(user));
  }
}
