import { Component, OnInit } from '@angular/core';
import { Participant } from '../models/participant.model';

@Component({
  selector: 'app-creation-sortie',
  templateUrl: './creation-sortie.component.html',
  styleUrls: ['./creation-sortie.component.css']
})
export class CreationSortieComponent implements OnInit {

  public participant: Participant;
  public lieux: any[];
  public sortie;
  public villes: any[];
  constructor() { }

  ngOnInit() {
  }

}
