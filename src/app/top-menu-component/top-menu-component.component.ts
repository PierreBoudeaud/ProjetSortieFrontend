import { Component } from '@angular/core';
import { ConnexionService } from '../services/connexion.service';
import {ToasterService} from 'angular2-toaster';

@Component({
  selector: 'app-top-menu-component',
  providers: [ToasterService],
  templateUrl: './top-menu-component.component.html',
  styleUrls: ['./top-menu-component.component.css']
})
export class TopMenuComponent implements OnInit {
  private static connexionService: ConnexionService;
  public static toasterService: ToasterService;

  constructor(public auth: ConnexionService, private toasterService: ToasterService) {
    TopMenuComponent.toasterService = this.toasterService;
    TopMenuComponent.connexionService = this.auth;
   }

  isAuth(): boolean {
    return ConnexionService.isAuth;
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

}
