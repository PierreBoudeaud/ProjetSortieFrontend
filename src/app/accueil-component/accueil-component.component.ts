import { Component, OnInit } from '@angular/core';
import { Site } from '../models/site.model';
import { SiteService } from '../services/site.service';

@Component({
  selector: 'app-accueil-component',
  templateUrl: './accueil-component.component.html',
  styleUrls: ['./accueil-component.component.css']
})
export class AccueilComponent implements OnInit {

  public sites: Site[];
  constructor(private siteService: SiteService) { }

  ngOnInit() {
    this.getSite();
  }

  getSite() {
    this.siteService.getSites().subscribe(
      data => {this.sites = data; console.log(data); },
      err => console.error(err),
      () => console.log('sites récupérés')
    );
  }

}
