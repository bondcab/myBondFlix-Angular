import { Component, OnInit, Input } from '@angular/core';

// Closes the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// These brings in the API calls
import { FetchApiDataService } from '../fetch-api-data.service';

// This is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

// Router module to handle routing
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent {
  // @Input defines the components inputs
  @Input() userData = { Username: '', Password: '' };

  // Method which injects instances of services or other dependecies into the component when its created
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  /**
   * Calls the userLogin function passing the data submitted in the login form component
   * @returns Sets the user response object in local storage
   * @returns Sets the token response in local storage
   * @returns Closes the login form dialog
   * @returns Shows a message of success
   * @returns Navigates to the homepage
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (response) => {
        // Takes the response from the endpoint and stores user and token in the browsers local storage
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);
        // Closes the login window
        this.dialogRef.close();
        // Brings up messages saying if login was successfu;
        this.snackBar.open('User login successful', 'Ok', {
          duration: 2000,
        });
        this.router.navigate(['movies']);
      },
      (response) => {
        console.log(response);
        this.snackBar.open(response, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
