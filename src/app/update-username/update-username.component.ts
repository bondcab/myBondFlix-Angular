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
  selector: 'app-update-username',
  templateUrl: './update-username.component.html',
  styleUrls: ['./update-username.component.scss'],
})
export class UpdateUsernameComponent {
  // @Input defines the components inputs
  @Input() username = { Username: '' };
  @Input() confirmUsername = { ConfirmUsername: '' };

  // userData = { Username: '', Password: '', Email: '', Birthday: '' };

  // Method which injects instances of services or other dependecies into the component when its created
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UpdateUsernameComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  // Fuction will send forms inputs to the backend
  updateUsername(): void {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    console.log('Password: ', storedUser.Password);
    if (this.username.Username === this.confirmUsername.ConfirmUsername) {
      console.log('matching');
      let usernameUpdate: {
        Username: string;
        Password: string;
        Email: string;
        DOB: Date;
      } = {
        Username: this.username.Username,
        Password: storedUser.Password,
        Email: storedUser.Email,
        DOB: storedUser.DOB,
      };
      console.log('Username update object', usernameUpdate);

      this.fetchApiData.usernameUpdate(usernameUpdate).subscribe(
        (response) => {
          console.log('Username change response ', response);
          // Takes the response from the endpoint and stores user and token in the browsers local storage
          localStorage.setItem('user', JSON.stringify(response));
          // Closes the login window
          this.dialogRef.close();
          // Brings up messages saying if login was successfu;
          this.snackBar.open('Username updated', 'Ok', {
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
