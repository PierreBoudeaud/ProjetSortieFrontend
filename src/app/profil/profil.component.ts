import { Component, OnInit } from '@angular/core';
import { Participant } from '../models/participant.model';
import { ParticipantService } from '../services/participant.service';
import { ActivatedRoute } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  public participant: Participant;
  constructor(private participantService: ParticipantService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getParticipant();
  }

  getParticipant() {
    const id = this.route.snapshot.paramMap.get('id');
    this.participantService.getParticipant(id).subscribe(
      data => {this.participant = data; console.log(data); },
      err => console.error(err),
      () => console.log('participant récupéré')
    );
  }
}
