import { Participant } from './participant.model';
import { Lieu } from './lieu.model';
import { Etat } from './etat.model';
import { Inscription } from './inscription.model';

export class Sortie {
    id?: number;
    nom: string;
    dateDebut: Date;
    duree?: number;
    dateCloture: Date;
    nbInscriptions: number;
    description?: String;
    organisateur: Participant;
    lieu: Lieu;
    etat: Etat;
    participants: Inscription[];
}
