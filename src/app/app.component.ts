// Angular component
import { Component } from '@angular/core';

// User registration component
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';

// User login component
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';

import { MatDialog } from '@angular/material/dialog';

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

  constructor(public dialog: MatDialog) {}
  // Function will open the dialog when the signup button is clicked
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      // Assigning the dialog width
      width: '280px',
    });
  }

  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      // Assigning the dialog width
      width: '280px',
    });
  }
}
