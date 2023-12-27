import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-component',
  templateUrl: './director-component.component.html',
  styleUrls: ['./director-component.component.scss'],
})
export class DirectorComponentComponent {
  directorDetails: {
    directorName: string;
    directorImage: string;
    directorBio: string;
  } = { directorName: '', directorImage: '', directorBio: '' };

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    // Access the movie title from the injected data

    this.directorDetails = {
      directorName: this.data.director,
      directorImage: this.data.directorImage,
      directorBio: this.data.directorBio,
    };
  }
}
