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

    constructor() {
        this.administrateur = false;
        this.site = new Site();
        this.actif = true;
    }

    copy(participant: Participant) {
        this.id = participant.id;
        this.pseudo = participant.pseudo;
        this.nom = participant.nom;
        this.prenom = participant.prenom;
        this.password = participant.password;
        this.telephone = participant.telephone;
        this.mail = participant.mail;
        this.administrateur = participant.administrateur;
        this.actif = participant.actif;
        this.site = participant.site;
    }
}
