import { Component, OnInit } from '@angular/core';
import { SortieService } from '../services/sortie.service';
import { Sortie } from '../models/sortie.model';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { Participant } from '../models/participant.model';
import { ParticipantService } from '../services/participant.service';

@Component({
  selector: 'app-afficher-sortie',
  templateUrl: './afficher-sortie.component.html',
  styleUrls: ['./afficher-sortie.component.css']
})
export class AfficherSortieComponent implements OnInit {

  public sortie: Sortie;

  constructor(private sortieService: SortieService, private participantService: ParticipantService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getSortie();
  }

  getSortie() {
    const id = this.route.snapshot.paramMap.get('id');
    this.sortieService.getSortie(id).toPromise()
      .then(sortie => {
        this.sortie = sortie;
        console.log(sortie);
        console.log('sortie récupérée');
      })
      .catch(err => console.error(err));
  }

}
