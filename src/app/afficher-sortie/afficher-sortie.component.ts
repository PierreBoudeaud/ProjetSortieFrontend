import { Component, OnInit } from '@angular/core';
import { SortieService } from '../services/sortie.service';
import { Sortie } from '../models/sortie.model';

@Component({
  selector: 'app-afficher-sortie',
  templateUrl: './afficher-sortie.component.html',
  styleUrls: ['./afficher-sortie.component.css']
})
export class AfficherSortieComponent implements OnInit {

  public sortie: Sortie;
  constructor(private sortieService: SortieService) { }

  ngOnInit() {
    this.getSortie();
  }

  getSortie() {
    this.sortieService.getSortie('1').subscribe(
      data => {this.sortie = data; console.log(data); },
      err => console.error(err),
      () => console.log('sortie récupérée')
    );
  }

}
