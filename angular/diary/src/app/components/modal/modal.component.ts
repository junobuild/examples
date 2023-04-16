import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { setDoc } from '@junobuild/core';
import { nanoid } from 'nanoid';

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
  ],
})
export class ModalComponent {
  diaryForm = this.formBuilder.group({
    entry: '',
  });

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ModalComponent>,
    private snackBar: MatSnackBar
  ) {}

  async onSubmit() {
    this.diaryForm.disable();

    try {
      await this.save();

      this.dialogRef.close();

      this.snackBar.open('Success!', 'Dismiss');
    } catch (err: unknown) {
      console.error(err);
      this.snackBar.open('Error', 'Dismiss', {
        panelClass: ['error'],
      });
    } finally {
      this.diaryForm.enable();
    }
  }

  private async save() {
    const key = nanoid();

    await setDoc({
      collection: 'notes',
      doc: {
        key,
        data: {
          text: this.diaryForm.value.entry,
        },
      },
    });
  }
}
