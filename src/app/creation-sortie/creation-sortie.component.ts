import { Component, OnInit } from '@angular/core';
import { Participant } from '../models/participant.model';
import { Sortie } from '../models/sortie.model';
import { SortieService } from '../services/sortie.service';
import { ParticipantService } from '../services/participant.service';
import { Token } from '../models/token.model';
import { TopMenuComponent } from '../top-menu-component/top-menu-component.component';
import { Observable } from 'rxjs';
import { VilleService } from '../services/ville.service';
import { Ville } from '../models/ville.model';
import { Lieu } from '../models/lieu.model';
import { LieuService } from '../services/lieu.service';
import { Site } from '../models/site.model';

@Component({
  selector: 'app-creation-sortie',
  templateUrl: './creation-sortie.component.html',
  styleUrls: ['./creation-sortie.component.css']
})
export class CreationSortieComponent implements OnInit {

  public participant: Participant;
  public lieux: Lieu[];
  public ville: Ville;
  public lieu: Lieu;
  public sortie: Sortie;
  public villes: Ville[];
  public site: Site;
  constructor(private participantService: ParticipantService,
    private sortieService: SortieService, private villeService: VilleService,
    private lieuService: LieuService) { }

  ngOnInit() {
    this.getParticipant();
    this.getVille();
    this.getLieux();
    this.sortie = new Sortie();
    this.ville = new Ville();
    this.lieu = new Lieu();
    this.participant = new Participant();
  }

  getParticipant() {
    const token: Token = JSON.parse(localStorage.getItem('token'));
    this.participantService.getParticipant(token.participant.id.toString()).subscribe(
      data => {this.participant = data; console.log(data); },
      err => console.error(err),
      () => console.log('participant récupéré')
    );
  }

  createSortie(sortie) {
    this.sortie.organisateur = this.participant;
    this.sortie.lieu = this.lieu;
    this.sortieService.createSortie(sortie).subscribe(
      data => {
        this.sortie = data;
        console.log(data);
        TopMenuComponent.popToastSuccess('Sauvegarde terminée', 'La sortie a été créée');
        return true;
      },
      error => {
        console.error('Erreur création sortie');
        TopMenuComponent.popToastError('Erreur sauvegarde Sortie', 'Une erreur est survenu pendant la sauvegarde de la sortie');
        return Observable.throw(error);
      }
    );
  }

  getVille() {
    this.villeService.getVilles().subscribe(
      data => {this.villes = data; console.log(data); },
      err => console.error(err),
      () => console.log('villes récupérées')
    );
  }

  getLieux() {
    this.lieuService.getLieux().subscribe(
      data => {this.lieux = data; console.log(data); console.log(this.lieux); },
      err => console.error(err),
      () => console.log('lieux réupérées')
    );
  }

  showDetailLieu(index) {
    const lieu = this.lieux[index];
    console.log(lieu);
    this.lieu.id = lieu.id;
    this.lieu.nom = lieu.nom;
    this.lieu.ville.id = lieu.ville.id;
    this.lieu.ville.nom = lieu.ville.nom;
    this.lieu.ville.codePostal = lieu.ville.codePostal;
    this.lieu.adresse = lieu.adresse;
    this.lieu.latitude = lieu.latitude;
    this.lieu.longitude = lieu.longitude;
  }

}
