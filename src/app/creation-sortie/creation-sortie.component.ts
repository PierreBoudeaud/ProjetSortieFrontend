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
import { ActivatedRoute } from '../../../node_modules/@angular/router';

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
  public updatedSortie: Sortie = null;

  public villeIndex: number;
  public lieuIndex: number;

  constructor(private participantService: ParticipantService,
    private sortieService: SortieService, private villeService: VilleService,
    private lieuService: LieuService, private route: ActivatedRoute) {
      this.sortie = new Sortie();
      this.ville = new Ville();
      this.lieu = new Lieu();
      this.participant = new Participant();
     }

  ngOnInit() {
    this.getParticipant();
    this.getVille();
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
      () =>  {
        console.log('villes récupérées');
        const idSortie = this.route.snapshot.paramMap.get('id');
        if (idSortie !== null) {
          this.sortieService.getSortie(idSortie).toPromise()
            .then(sortie => {
              this.updatedSortie = sortie;
              this.sortie.id = sortie.id;
              this.sortie.nom = sortie.nom;
              this.sortie.etat = sortie.etat;
              this.sortie.duree = sortie.duree;
              this.sortie.description = sortie.description;
              this.sortie.dateDebut = new Date(sortie.dateDebut);
              this.sortie.dateCloture = new Date(sortie.dateCloture);
              this.sortie.nbInscriptions = sortie.nbInscriptions;
              this.sortie.organisateur = sortie.organisateur;
              let i = 0;
              let found = false;
              this.villes.forEach(ville => {
                if (!found && ville.id !== sortie.lieu.ville.id) {
                  i++;
                } else {
                  found = true;
                }
              });
              this.changeVille(i);
              this.villeIndex = i;
            })
            .catch();
        } else {
          this.getLieux(this.villes[0].id);
        }
     }
    );
  }

  getLieux(idVille: number) {
    this.lieuService.getLieuOfVille(idVille).subscribe(
      data => {this.lieux = data; console.log(data); console.log(this.lieux); },
      err => console.error(err),
      () => {
        console.log('lieux récupérées');
        if (this.updatedSortie !== null) {
          let index: number;
          let found = false;
          this.lieux.forEach(lieu => {
            if (!found && lieu.id !== this.updatedSortie.lieu.id) {
              index++;
            } else {
              found = true;
            }
          });
          this.showDetailLieu(index);
          this.lieuIndex = index;
        }
      }
    );
  }

  showDetailLieu(index) {
    const lieu = index > -1 ? this.lieux[index] : new Lieu();
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

  changeVille(index) {
    const ville = this.villes[index];
    console.log(ville);
    this.ville.id = ville.id;
    this.ville.nom = ville.nom;
    this.ville.codePostal = ville.codePostal;
    this.showDetailLieu(-1);
    this.getLieux(ville.id);
  }

}
