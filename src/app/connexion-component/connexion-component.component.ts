import { Component, OnInit } from '@angular/core';
import { ConnexionService } from '../services/connexion.service';
import { Router } from '@angular/router';
import { TopMenuComponent } from '../top-menu-component/top-menu-component.component';
import { SiteService } from '../services/site.service';

@Component({
  selector: 'app-connexion-component',
  templateUrl: './connexion-component.component.html',
  styleUrls: ['./connexion-component.component.css']
})
export class ConnexionComponent implements OnInit {

  authStatus: boolean;

  credentials: any;

  creationMode: boolean;

  sites: Site[];

  constructor(private connexionService: ConnexionService, private siteService: SiteService, private router: Router) {
    this.cleanForm();
    this.creationMode = false;
   }

  ngOnInit() {
    this.authStatus = ConnexionService.isAuth;
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
