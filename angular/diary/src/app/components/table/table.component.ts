import { NgIf } from '@angular/common';
import { Component, inject, Signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { type Doc } from '@junobuild/core';
import { DocsService } from '../../services/docs.service';
import type { Entry } from '../../types/entry';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  imports: [NgIf, MatTableModule, MatIconModule],
  standalone: true,
})
export class TableComponent {
  private readonly docsService = inject(DocsService);
  readonly displayedColumns: string[] = ['key', 'text', 'url'];
  readonly docs: Signal<Doc<Entry>[]> = this.docsService.docs;
}
