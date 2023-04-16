import {Component, Inject} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {setDoc, uploadFile, User} from '@junobuild/core';
import { nanoid } from 'nanoid';
import {MatToolbarModule} from "@angular/material/toolbar";
import {AuthService} from "../../services/auth.service";
import {catchError, filter, from, NEVER, switchMap, take} from "rxjs";

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
  diaryForm = this.formBuilder.group({
    entry: '',
  });

  private file: File | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ModalComponent>,
    private snackBar: MatSnackBar,
    @Inject(AuthService) private authService: AuthService,
  ) {}

  async onSubmit() {
    this.diaryForm.disable();

    this.authService.user$.pipe(
      filter(user => user !== null),
      switchMap(user => from(this.save(user as User))),
      take(1),
      catchError((err: unknown) => {
        console.error(err);

        this.snackBar.open('Error', 'Dismiss', {
          panelClass: ['error'],
        });

        this.diaryForm.enable();

        return NEVER;
      })
    ).subscribe(() => {
      this.dialogRef.close();

      this.snackBar.open('Success!', 'Dismiss');
    });
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
        collection: "images",
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
