import { Ville } from './ville.model';

export class Lieu {
    id: number;
    nom: string;
    adresse: string;
    latitude: number;
    longitude: number;
    ville: Ville;

    constructor() {
        this.ville = new Ville();
    }
}
