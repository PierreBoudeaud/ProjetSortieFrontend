import { Component, OnInit } from '@angular/core';
import { ParticipantService } from '../services/participant.service';
import { Participant } from '../models/participant.model';
import { SiteService } from '../services/site.service';
import { Site } from '../models/site.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mon-profil',
  templateUrl: './mon-profil.component.html',
  styleUrls: ['./mon-profil.component.css']
})
export class MonProfilComponent implements OnInit {

  public participant: Participant;
  public sites: Site[];
  constructor(private participantService: ParticipantService, private siteService: SiteService) { }
  ngOnInit() {
    this.getParticipant();
    this.getSite();
  }

  getParticipant() {
    this.participantService.getParticipant('2').subscribe(
      data => {this.participant = data; console.log(data); },
      err => console.error(err),
      () => console.log('participant récupéré')
    );
  }

  getSite() {
    this.siteService.getSites().subscribe(
      data => {this.sites = data; console.log(data); },
      err => console.error(err),
      () => console.log('sites récupérés')
    );
  }

  updateParticipant(participant) {
    this.participantService.updateParticipant(participant).subscribe(
      data => {
        this.getParticipant();
        console.log(data);
        return true;
      },
      error => {
        console.error('Erreur modification participant');
        return Observable.throw(error);
      }
    );
  }

}
