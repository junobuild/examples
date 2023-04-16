import {Component, Inject, OnInit} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { listDocs, type Doc } from '@junobuild/core';
import type { Entry } from '../../types/entry';
import {Observable} from "rxjs";
import {DocsService} from "../../services/docs.service";
import {BrowserModule} from "@angular/platform-browser";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  imports: [BrowserModule, MatTableModule],
  standalone: true,
})
export class TableComponent {
  displayedColumns: string[] = ['key', 'text'];

  docs$: Observable<Doc<Entry>[]> = this.docsService.docs$;

  constructor(@Inject(DocsService) private docsService: DocsService) {
  }
}
