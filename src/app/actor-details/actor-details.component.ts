import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-actor-details',
  templateUrl: './actor-details.component.html',
  styleUrls: ['./actor-details.component.scss'],
})
export class ActorDetailsComponent {
  actorDetails: {
    actorName: string;
    actorImage: string;
    actorBio: string;
  } = { actorName: '', actorImage: '', actorBio: '' };

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    // Access the movie title from the injected data

    this.actorDetails = {
      actorName: this.data.actor,
      actorImage: this.data.actorImage,
      actorBio: this.data.actorBio,
    };
  }
}
