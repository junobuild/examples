import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initJuno } from '@junobuild/core';
import { HomeComponent } from './components/home/home.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet, HomeComponent],
  standalone: true,
})
export class AppComponent implements OnInit {
  title = 'diary';

  async ngOnInit() {
    await initJuno({
      satelliteId: 'f62k6-laaaa-aaaal-acq7q-cai',
    });
  }
}
