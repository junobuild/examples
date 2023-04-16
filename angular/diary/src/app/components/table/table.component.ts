import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { listDocs, type Doc } from '@junobuild/core';
import type { Entry } from '../../types/entry';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  imports: [MatTableModule],
  standalone: true,
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['key', 'text'];

  docs: Doc<Entry>[] = [];

  async ngOnInit() {
    await this.list();
  }

  private async list() {
    const { items } = await listDocs<Entry>({
      collection: 'notes',
      filter: {},
    });

    this.docs = items;

    console.log(items);
  }
}
