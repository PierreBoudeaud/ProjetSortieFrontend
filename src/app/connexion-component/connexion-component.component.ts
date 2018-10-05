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

  constructor(private connexionService: ConnexionService, private router: Router) { }

  ngOnInit() {
    this.authStatus = this.connexionService.isAuth;
  }

  onSignIn() {
    this.connexionService.signIn().then(
      () => {
        console.log('Sign in succesful');
        this.authStatus = this.connexionService.isAuth;
        this.router.navigate(['accueil']);
      }
    );
  }

  onSignOut() {
    this.connexionService.signOut();
    this.authStatus = this.connexionService.isAuth;
  }

}
