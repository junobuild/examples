import { Component, Inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { signIn, signOut } from '@junobuild/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [BrowserModule, MatButtonModule],
})
export class HomeComponent {
  readonly signedIn$ = this.authService.signedIn$;

  readonly signOut = signOut;
  readonly signIn = signIn;

  constructor(@Inject(AuthService) private authService: AuthService) {
    this.authService.user$.subscribe((yo) => console.log(yo));
  }
}
