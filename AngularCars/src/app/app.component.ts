import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DesplayCarsComponent } from './desplay-cars/desplay-cars.component';
import { LoginComponent } from './login/login.component'; // 👈 תוסיף

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DesplayCarsComponent, LoginComponent], // 👈 תוסיף
  templateUrl: './app.component.html',

})
export class AppComponent {
  title = 'cars-rental';
}