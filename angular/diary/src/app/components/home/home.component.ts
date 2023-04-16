import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { signIn, signOut } from '@junobuild/core';
import { AuthService } from '../../services/auth.service';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [BrowserModule, MatButtonModule, ModalComponent, MatDialogModule],
})
export class HomeComponent {
  readonly signedIn$ = this.authService.signedIn$;

  readonly signOut = signOut;
  readonly signIn = signIn;

  constructor(
    @Inject(AuthService) private authService: AuthService,
    @Inject(MatDialog) private dialog: MatDialog
  ) {}

  openModal() {
    let dialogRef = this.dialog.open(ModalComponent, {
      height: '400px',
      width: '600px',
    });
  }
}
