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
  selector: 'app-update-email',
  templateUrl: './update-email.component.html',
  styleUrls: ['./update-email.component.scss'],
})
export class UpdateEmailComponent {
  // @Input defines the components inputs
  @Input() email = { Email: '' };
  @Input() confirmEmail = { ConfirmEmail: '' };

  // userData = { Username: '', Password: '', Email: '', Birthday: '' };

  // Method which injects instances of services or other dependecies into the component when its created
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UpdateEmailComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  /**
   * Sends updated email to the update user information endpoint
   * @params emailUpdate
   * @returns Console logs endpoint response
   * @returns Updates local storage user with endpoint response
   * @returns Closes the login form dialog
   * @returns Shows a message of success
   * @returns Navigates to the profile page
   */
  updateEmail(): void {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

    if (this.email.Email === this.confirmEmail.ConfirmEmail) {
      let emailUpdate: {
        Username: string;
        Password: string;
        Email: string;
        DOB: Date;
      } = {
        Username: storedUser.Username,
        Password: storedUser.Password,
        Email: this.email.Email,
        DOB: storedUser.DOB,
      };
      console.log('Email update object', emailUpdate);

      this.fetchApiData.emailUpdate(emailUpdate).subscribe(
        (response) => {
          console.log('Email change response ', response);
          // Takes the response from the endpoint and stores user and token in the browsers local storage
          localStorage.setItem('user', JSON.stringify(response));
          // Closes the login window
          this.dialogRef.close();
          // Brings up messages saying if login was successfu;
          this.snackBar.open('Email updated', 'Ok', {
            duration: 2000,
          });
          this.router.navigate(['profile']);
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
}
