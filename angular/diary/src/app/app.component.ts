import { Component, OnInit } from '@angular/core';
import { initJuno } from '@junobuild/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'diary';

  async ngOnInit() {
    await initJuno({
      satelliteId: 'f62k6-laaaa-aaaal-acq7q-cai',
    });
  }
}
