import { Component, OnInit } from '@angular/core';
import { Site } from '../models/site.model';
import { SiteService } from '../services/site.service';
import { Participant } from '../models/participant.model';
import { Token } from '../models/token.model';
import { SortieService } from '../services/sortie.service';
import { Sortie } from '../models/sortie.model';

@Component({
  selector: 'app-accueil-component',
  templateUrl: './accueil-component.component.html',
  styleUrls: ['./accueil-component.component.css']
})
export class AccueilComponent implements OnInit {

  public today: Date;
  public participant: Participant;
  public sites: Site[];
  public sorties: Sortie[];

  constructor(private siteService: SiteService, private sortieService: SortieService) {
    const token: Token = JSON.parse(localStorage.getItem('token'));
    this.participant = token.participant;
    this.today = new Date();
   }

  ngOnInit() {
    this.getSite();
    this.getSorties();
  }

  getSite() {
    this.siteService.getSites().subscribe(
      data => {this.sites = data; console.log(data); },
      err => console.error(err),
      () => console.log('sites récupérés')
    );
  }

  getSorties() {
    this.sortieService.getSorties().subscribe(
      data => {this.sorties = data; console.log(data); },
      err => console.error(err),
      () => console.log('sorties récupérées')
    );
  }

}
