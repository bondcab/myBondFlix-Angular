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
  selector: 'app-update-dob',
  templateUrl: './update-dob.component.html',
  styleUrls: ['./update-dob.component.scss'],
})
export class UpdateDobComponent {
  // @Input defines the components inputs
  @Input() dob = { date: new Date('') };

  // userData = { Username: '', Password: '', Email: '', Birthday: '' };

  // Method which injects instances of services or other dependecies into the component when its created
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UpdateDobComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  /**
   * Sends updated date of birth to the update user information endpoint
   * @params dobUpdate
   * @returns Console logs endpoint response
   * @returns Updates local storage user with endpoint response
   * @returns Closes the login form dialog
   * @returns Shows a message of success
   * @returns Navigates to the profile page
   */
  updateDOB(): void {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    console.log('Password: ', storedUser.Password);

    console.log('matching');
    let dobUpdate: {
      Username: string;
      Password: string;
      Email: string;
      DOB: Date;
    } = {
      Username: storedUser.Username,
      Password: storedUser.Password,
      Email: storedUser.Email,
      DOB: this.dob.date,
    };
    console.log('Username update object', dobUpdate);

    this.fetchApiData.userDOBUpdate(dobUpdate).subscribe(
      (response) => {
        console.log(response);
        // Takes the response from the endpoint and stores user and token in the browsers local storage
        localStorage.setItem('user', JSON.stringify(response));
        // Closes the login window
        this.dialogRef.close();
        // Brings up messages saying if login was successfu;
        this.snackBar.open('Date of birth updated', 'Ok', {
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
