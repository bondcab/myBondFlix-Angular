import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';

import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {}

  /**
   * Opens dialog containing the userLoginFormComponent
   * @returns User login dialog
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      // Assigning the dialog width
      width: '280px',
    });
  }

  /**
   * Opens dialog containing the userRegistrationFormComponent
   * @returns User registration dialog
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      // Assigning the dialog width
      width: '280px',
    });
  }
}
