import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { setDoc, uploadFile, User } from '@junobuild/core';
import { nanoid } from 'nanoid';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatToolbarModule,
  ],
})
export class ModalComponent {
  private readonly authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  private dialogRef = inject<MatDialogRef<ModalComponent>>(MatDialogRef);
  private snackBar = inject(MatSnackBar);

  diaryForm = this.formBuilder.group({
    entry: '',
  });

  private file: File | undefined;

  async onSubmit() {
    const user = this.authService.user();
    if (user) {
      try {
        this.diaryForm.disable();
        await this.save(user);
        this.dialogRef.close();
        this.snackBar.open('Success!', 'Dismiss');
      } catch (err) {
        console.error(err);
        this.snackBar.open('Error', 'Dismiss', {
          panelClass: ['error'],
        });
      } finally {
        this.diaryForm.enable();
      }
    }
  }

  close() {
    this.dialogRef.close();
  }

  onFileChanged($event: Event) {
    const target = $event.target as HTMLInputElement;
    this.file = target.files?.[0];
  }

  private async save(user: User) {
    let url;

    if (this.file !== undefined) {
      const filename = `${user.key}-${this.file.name}`;

      const { downloadUrl } = await uploadFile({
        collection: 'images',
        data: this.file,
        filename,
      });

      url = downloadUrl;
    }

    const key = nanoid();

    await setDoc({
      collection: 'notes',
      doc: {
        key,
        data: {
          text: this.diaryForm.value.entry,
          ...(url !== undefined && { url }),
        },
      },
    });
  }
}
