import { Component, OnInit } from '@angular/core';
import { Participant } from '../models/participant.model';
import { ParticipantService } from '../services/participant.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  public participant: Participant;
  constructor(private participantService: ParticipantService) { }

  ngOnInit() {
    this.getParticipant();
  }

  getParticipant() {
    this.participantService.getParticipant('1').subscribe(
      data => {this.participant = data; console.log(data); },
      err => console.error(err),
      () => console.log('participant récupéré')
    );
  }
}
