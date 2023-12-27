import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { UpdateUsernameComponent } from '../update-username/update-username.component';

import { UpdateDobComponent } from '../update-dob/update-dob.component';

import { UpdateEmailComponent } from '../update-email/update-email.component';

@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html',
  styleUrls: ['./update-info.component.scss'],
})
export class UpdateInfoComponent {
  user: { Username: string; DOB: string; Email: string } | null = JSON.parse(
    localStorage.getItem('user') || '{}'
  );

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog
  ) {}

  // Will run when component first intialises
  ngOnInit(): void {
    console.log(this.user?.Username);
    if (this.user) {
      this.user.DOB = this.user?.DOB.slice(0, 10);
    }
  }

  // Function to open the profile page
  openHomePage(): void {
    this.router.navigate(['movies']);
  }

  openUpdateUsernameDialog(): void {
    this.dialog.open(UpdateUsernameComponent, {
      // Assigning the dialog width
      width: '280px',
    });
  }

  openUpdateDOBDialog(): void {
    this.dialog.open(UpdateDobComponent, {
      // Assigning the dialog width
      width: '280px',
    });
  }

  openUpdateEmailDialog(): void {
    this.dialog.open(UpdateEmailComponent, {
      // Assigning the dialog width
      width: '280px',
    });
  }

  cancelInfoUpdate(): void {
    this.router.navigate(['profile']);
  }
}
