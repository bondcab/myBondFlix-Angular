// Angular component
import { Component } from '@angular/core';

@Component({
  // Selects the app-root element inside index.html and renders everything inside app.component.html inside it
  selector: 'app-root',
  // Whats being added to the selector (app-root)
  templateUrl: './app.component.html',
  // Styles the above component
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'myBondFlix-Angular-client';
}
