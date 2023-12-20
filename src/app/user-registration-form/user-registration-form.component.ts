// Angular features
import { Component, OnInit, Input } from '@angular/core';

// Closes the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// These brings in the API calls
import { FetchApiDataService } from '../fetch-api-data.service';

// This is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  // Generates an element  element '<app-user-registration-form></app-user-registration-form>' which you have added to 'app.component.html'
  selector: 'app-user-registration-form',
  // Whats being added to the selector (app-user-registration-form)
  templateUrl: './user-registration-form.component.html',
  // Styles the above component
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent implements OnInit {
  // @Input defines the components inputs
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  // Method which injects instances of services or other dependecies into the component when its created
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  // Will run when component first intialises
  ngOnInit(): void {}

  // Fuction will send forms inputs to the backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (response) => {
        console.log(response);
        this.dialogRef.close();
        this.snackBar.open('User registration successful', 'Ok', {
          duration: 2000,
        });
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
