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
      satelliteId: 'pycrs-xiaaa-aaaal-ab6la-cai',
    });
  }
}
