import { Component } from '@angular/core';
import { ConnexionService } from '../services/connexion.service';
import {ToasterService} from 'angular2-toaster';
import { Participant } from '../models/participant.model';
import { Token } from '../models/token.model';

@Component({
  selector: 'app-top-menu-component',
  providers: [ToasterService],
  templateUrl: './top-menu-component.component.html',
  styleUrls: ['./top-menu-component.component.css']
})
export class TopMenuComponent {
  private static connexionService: ConnexionService;
  public static toasterService: ToasterService;
  public static participant: Participant = new Participant();

  public participant: Participant;


  constructor(public auth: ConnexionService, private toasterService: ToasterService) {
    TopMenuComponent.toasterService = this.toasterService;
    TopMenuComponent.connexionService = this.auth;
    if (ConnexionService.isAuth) {
      const token: Token = JSON.parse(localStorage.getItem('token'));
      TopMenuComponent.participant = token.participant;
    }
    this.participant = TopMenuComponent.participant;
   }

  static logOut() {
    TopMenuComponent.connexionService.signOut();
  }

  public static popToastSuccess(title: string, body: string) {
    this.popToast('success', title, body);
  }

  public static popToastError(title: string, body: string) {
    this.popToast('error', title, body);
  }

  private static popToast(type: string, title: string, body: string) {
    this.toasterService.pop(type, title, body);
  }

  isAuth(): boolean {
    return ConnexionService.isAuth;
  }

  logout() {
    this.auth.signOut();
  }
}
