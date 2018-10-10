import { Component } from '@angular/core';
import { Participant } from '../models/participant.model';
import { Site } from '../models/site.model';
import { SiteService } from '../services/site.service';
import { Token } from '../models/token.model';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css']
})
export class SitesComponent {

  public participant: Participant;
  public sites: Site[];

  public newSite: Site;

  constructor(private siteService: SiteService) { 
    this.newSite = new Site();
    this.sites = [];
    const token: Token = JSON.parse(localStorage.getItem("token"));
    this.participant = token.participant;
    this.getSites();
  }

  ngOnInit() {
  }

  getSites() {
    this.siteService.getSites().toPromise()
      .then(sites => this.sites = sites);
  }

  addSite() {
    this.siteService.createSite(this.newSite).toPromise()
      .then(site => {
        this.sites.push(site);
        this.newSite.nom = "";
      });
  }

}
