import { Component } from '@angular/core';
import { Participant } from '../models/participant.model';
import { Ville } from '../models/ville.model';
import { VilleService } from '../services/ville.service';
import { Token } from '../models/token.model';

@Component({
  selector: 'app-villes',
  templateUrl: './villes.component.html',
  styleUrls: ['./villes.component.css']
})
export class VillesComponent {

  public participant: Participant;
  public villes: Ville[];

  public newVille: Ville;

  constructor(private villeService: VilleService) { 
    this.newVille = new Ville();
    this.villes = [];
    const token: Token = JSON.parse(localStorage.getItem("token"));
    this.participant = token.participant;
    this.getVilles();
  }

  ngOnInit() {
  }

  getVilles() {
    this.villeService.getVilles().toPromise()
      .then(villes => this.villes = villes);
  }

  addVille() {
    this.villeService.createVille(this.newVille).toPromise()
      .then(ville => {
        this.villes.push(ville);
        this.newVille.nom = "";
        this.newVille.codePostal = "";
      });
  }

}
