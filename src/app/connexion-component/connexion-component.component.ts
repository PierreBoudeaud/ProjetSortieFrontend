import { Component, OnInit } from '@angular/core';
import { ConnexionService } from '../services/connexion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion-component',
  templateUrl: './connexion-component.component.html',
  styleUrls: ['./connexion-component.component.css']
})
export class ConnexionComponent implements OnInit {

  authStatus: boolean;

  credentials: any;

  pseudo: string;

  password: string;

  remember: boolean;
  

  constructor(private connexionService: ConnexionService, private router: Router) {
    this.cleanForm();
   }

  ngOnInit() {
    this.authStatus = ConnexionService.isAuth;
  }

  cleanForm() {
    this.credentials = {
      pseudo: '',
      password: '',
      remember: false
    };
  }

  onSignIn() {
    let email = '';
    let pseudo = '';
    if(this.credentials.pseudo.includes('@')){
      email = this.credentials.pseudo;
    } else {
      pseudo = this.credentials.pseudo;
    }

    this.connexionService.signIn(this.credentials.password, email, pseudo, this.credentials.remember);
  }

  onSignOut() {
    this.connexionService.signOut();
    this.authStatus = ConnexionService.isAuth;
  }

}
