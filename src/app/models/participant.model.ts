import {Site} from './site.model';

export class Participant {
    id?: number;
    pseudo: string;
    nom: string;
    prenom: string;
    password?: string;
    telephone?: string;
    mail: string;
    administrateur: boolean;
    actif: boolean;
    site: Site;
}
