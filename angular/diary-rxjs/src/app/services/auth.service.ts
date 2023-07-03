import { Injectable } from '@angular/core';
import { authSubscribe, User } from '@junobuild/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly user$: Observable<User | null> = new Observable((observer) =>
    authSubscribe((user) => observer.next(user))
  );

  readonly signedIn$: Observable<boolean> = this.user$.pipe(
    map((user) => user !== null)
  );
}
