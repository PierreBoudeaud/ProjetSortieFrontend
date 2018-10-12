import { Component, OnInit } from '@angular/core';
import { ConnexionService } from '../services/connexion.service';
import { Router } from '@angular/router';
import { TopMenuComponent } from '../top-menu-component/top-menu-component.component';
import { SiteService } from '../services/site.service';
import { Site } from '../models/site.model';
import { Participant } from '../models/participant.model';
import { ParticipantService } from '../services/participant.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-connexion-component',
  templateUrl: './connexion-component.component.html',
  styleUrls: ['./connexion-component.component.css']
})
export class ConnexionComponent implements OnInit {

  authStatus: boolean;
  participant: Participant;
  credentials: any;

  creationMode: boolean;

  sites: Site[];

  constructor(private connexionService: ConnexionService, private siteService: SiteService,
    private participantService: ParticipantService, private router: Router) {
    this.cleanForm();
    this.creationMode = false;
   }

  ngOnInit() {
    this.authStatus = ConnexionService.isAuth;
    this.participant = new Participant();
    this.getSite();
  }

  getSite() {
    this.siteService.getSites().subscribe(
      data => {this.sites = data; console.log(data); },
      err => console.error(err),
      () => console.log('sites récupérés')
    );
  }

  createParticipant(participant) {
    this.participantService.createParticipant(participant).subscribe(
      data => {
        this.participant = data;
        console.log(data);
        TopMenuComponent.popToastSuccess('Sauvegarde terminée', 'Le participant a été créée');
        return true;
      },
      error => {
        console.error('Erreur création participant');
        TopMenuComponent.popToastError('Erreur sauvegarde Participant', 'Une erreur est survenu pendant la sauvegarde de la sortie');
        return Observable.throw(error);
      }
    );
  }

  connexionMode() {
    this.creationMode = false;
  }

  inscriptionMode() {
    this.creationMode = true;
  }

  cleanForm() {
    this.credentials = {
      pseudo: '',
      password: '',
      remember: false,
      error: false
    };
  }

  switchStateError(): void {
    this.credentials.error = !this.credentials.error;
  }

  onSignIn() {
    let email = '';
    let pseudo = '';
    if (this.credentials.pseudo.includes('@')) {
      email = this.credentials.pseudo;
    } else {
      pseudo = this.credentials.pseudo;
    }

    this.connexionService.signIn(this.credentials.password, email, pseudo, this.credentials.remember).toPromise()
      .then(data => {
        localStorage.setItem('token', JSON.stringify(data));
        ConnexionService.isAuth = true;
        TopMenuComponent.participant.copy(data.participant);
        this.router.navigate(['/accueil']);
      })
      .catch(err => {
        this.credentials.error = true;
        this.credentials.password = '';
      });
  }

  onSignOut() {
    this.connexionService.signOut();
    this.authStatus = ConnexionService.isAuth;
  }

}
