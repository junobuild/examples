import { Component, Inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { type Doc } from '@junobuild/core';
import { Observable } from 'rxjs';
import { DocsService } from '../../services/docs.service';
import type { Entry } from '../../types/entry';
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  imports: [BrowserModule, MatTableModule, MatIconModule],
  standalone: true,
})
export class TableComponent {
  displayedColumns: string[] = ['key', 'text', 'url'];

  docs$: Observable<Doc<Entry>[]> = this.docsService.docs$;

  constructor(@Inject(DocsService) private docsService: DocsService) {}
}
