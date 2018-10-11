import { Component } from '@angular/core';
import { Participant } from '../models/participant.model';
import { ParticipantService } from '../services/participant.service';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css']
})
export class ParticipantsComponent {
  public participants: Participant[];

  constructor(private participantService: ParticipantService) {
    this.participants = [];
    this.getParticipants();
  }

  getParticipants() {
    this.participantService.getParticipants().toPromise()
      .then(participants => this.participants = participants);
  }
}
