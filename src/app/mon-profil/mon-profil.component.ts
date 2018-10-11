import { Component, OnInit } from '@angular/core';
import { ParticipantService } from '../services/participant.service';
import { Participant } from '../models/participant.model';
import { SiteService } from '../services/site.service';
import { Site } from '../models/site.model';
import { Observable } from 'rxjs';
import { Token } from '../models/token.model';
import { TopMenuComponent } from '../top-menu-component/top-menu-component.component';

@Component({
  selector: 'app-mon-profil',
  templateUrl: './mon-profil.component.html',
  styleUrls: ['./mon-profil.component.css']
})
export class MonProfilComponent implements OnInit {

  public participant: Participant;
  public password1: string;
  public password2: string;
  public passwordIdentical: boolean;
  public sites: Site[];
  constructor(private participantService: ParticipantService, private siteService: SiteService) {
    this.resetForm();
  }
  ngOnInit() {
    this.getParticipant();
    this.getSite();
  }

  private resetForm() {
    this.password1 = '';
    this.password2 = '';
    this.passwordIdentical = true;
  }

  getParticipant() {
    const token: Token = JSON.parse(localStorage.getItem('token'));
    this.participantService.getParticipant(token.participant.id.toString()).subscribe(
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
    this.passwordIdentical = this.password1 === this.password2;
    if (this.passwordIdentical) {
      this.participant.password = this.password1;
      this.participantService.updateParticipant(participant).subscribe(
        data => {
          this.participant = data;
          this.resetForm();
          console.log(data);
          TopMenuComponent.popToastSuccess('Sauvegarde terminé', 'Le participant a correctement été mis à jour');
          return true;
        },
        error => {
          console.error('Erreur modification participant');
          TopMenuComponent.popToastError('Erreur sauvegarde participant', 'Une erreur est survenu pendant la sauvegarde du participant');
          return Observable.throw(error);
        }
      );
    }
  }

}
