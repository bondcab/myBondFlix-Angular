// Modules from Angular and other libraries
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';

@NgModule({
  // Defines components which are part of the app module
  declarations: [AppComponent, UserRegistrationFormComponent, UserLoginFormComponent],
  imports: [
    BrowserModule, // Provides services that are essential to launch and run a browser app
    AppRoutingModule, // Handles the routing configuration for the app
    HttpClientModule, // Provides a simplified client HTTP API for Angular applications
    BrowserAnimationsModule, // Enables animation features in the application
    MatInputModule, // Material Design input field module
    MatButtonModule, // Material Design button module
    MatCardModule, // Material Design card module
    MatFormFieldModule, // Material Design form field module
    MatDialogModule, // Material Design dialog module
    MatSnackBarModule, // Material Design snack bar module
    FormsModule, // Module for two-way data binding with forms in Angular
  ],
  // Services that can be injected into components or other services
  providers: [],
  // The root component that Angular creates and inserts into the index.html host web page
  bootstrap: [AppComponent],
})
export class AppModule {}
