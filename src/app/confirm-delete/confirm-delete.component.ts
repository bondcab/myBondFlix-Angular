import { Component } from '@angular/core';

import { FetchApiDataService } from '../fetch-api-data.service';

import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { MatDialogRef } from '@angular/material/dialog';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss'],
})
export class ConfirmDeleteComponent {
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ConfirmDeleteComponent>,
    public snackBar: MatSnackBar
  ) {}

  cancelDeleteAccount(): void {
    this.dialogRef.close();
  }

  // Fuction will delete user
  deleteUser(): void {
    this.fetchApiData.userDelete().subscribe((response) => {
      console.log(response);
      this.dialogRef.close();
      this.snackBar.open('User deleted', 'Ok', {
        duration: 2000,
      });
    });

    this.dialogRef.close();
    this.router.navigate(['welcome']);
  }
}
